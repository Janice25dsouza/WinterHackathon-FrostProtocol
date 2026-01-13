import { useState } from "react";
import { getRequests, approveRequest, rejectRequest } from "../data/schemeRequests";
import { getContract } from "../utils/getContract";

function CentralDashboard() {
  const [requests, setRequests] = useState(getRequests());

  async function approveSchemeRequest(index) {
    try {
      const req = requests[index];
      const contract = await getContract();

      await contract.approveSchemeFund(
        req.scheme,
        Number(req.amount)
      );

      approveRequest(index);
      setRequests([...getRequests()]);
      alert("✅ Funds transferred to scheme");
    } catch (err) {
      console.error(err);
      alert("❌ Blockchain transfer failed");
    }
  }

  function decline(index) {
    rejectRequest(index);
    setRequests([...getRequests()]);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🏛 Central Dashboard</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Scheme</th>
              <th style={styles.th}>Purpose</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan="4" style={styles.empty}>
                  No pending requests
                </td>
              </tr>
            )}

            {requests.map((r, i) => (
              <tr key={i}>
                <td style={styles.td}>{r.scheme}</td>
                <td style={styles.td}>{r.purpose}</td>
                <td style={styles.td}>{r.amount}</td>
                <td style={styles.td}>
                  <button
                    style={styles.approveBtn}
                    onClick={() => approveSchemeRequest(i)}
                  >
                    Approve
                  </button>

                  <button
                    style={styles.rejectBtn}
                    onClick={() => decline(i)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#b5c4e1",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: 700,
    background: "#ffffff",
    borderRadius: 8,
    padding: 30,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#071535",
    color: "#fff",
    padding: 10,
    fontSize: 14,
  },

  td: {
    padding: 10,
    borderBottom: "1px solid #ddd",
    textAlign: "center",
    fontSize: 14,
  },

  empty: {
    textAlign: "center",
    padding: 20,
    color: "#666",
  },

  approveBtn: {
    padding: "6px 12px",
    marginRight: 6,
    border: "none",
    borderRadius: 4,
    background: "#071535",
    color: "#fff",
    cursor: "pointer",
  },

  rejectBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: 4,
    background: "#999",
    color: "#fff",
    cursor: "pointer",
  },
};

export default CentralDashboard;
