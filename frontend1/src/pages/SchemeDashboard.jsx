import { useState } from "react";
import { addRequest } from "../data/schemeRequests";

import {
  getBeneficiaryRequests,
  approveBeneficiary,
  rejectBeneficiary,
  markDisbursed
} from "../data/beneficiaryRequests";

import { getContract } from "../utils/getContract";

function SchemeDashboard() {

  /* ================= CENTRAL FUND REQUEST ================= */
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");

  function submitFundRequest() {
    if (!purpose || !amount) {
      alert("Fill all fields");
      return;
    }

    addRequest({
      scheme: "scheme1",
      purpose,
      amount,
      timestamp: Date.now(),
    });

    alert("✅ Request sent to Central Government");
    setPurpose("");
    setAmount("");
  }

  /* ================= BENEFICIARY FLOW ================= */
  const [requests, setRequests] = useState(getBeneficiaryRequests());

  function refresh() {
    setRequests([...getBeneficiaryRequests()]);
  }

  function approve(index) {
    approveBeneficiary(index);
    refresh();
  }

  function reject(index) {
    rejectBeneficiary(index);
    refresh();
  }

  async function allocate(index) {
    try {
      const req = requests[index];
      const contract = await getContract();

      const tx = await contract.approveBeneficiaryFund(
        "scheme1",
        req.beneficiary,
        Number(req.amount)
      );

      await tx.wait();

      markDisbursed(index);
      refresh();
      alert("✅ Funds transferred to beneficiary!");
    } catch (err) {
      console.error("Blockchain error:", err);
      alert("❌ Blockchain transfer failed");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📋 Scheme Dashboard</h2>

        {/* ================= REQUEST FUNDS ================= */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Request Funds from Central</h3>

          <input
            style={styles.input}
            placeholder="Purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button style={styles.primaryBtn} onClick={submitFundRequest}>
            Request Funds
          </button>
        </section>

        {/* ================= VALIDATE BENEFICIARY ================= */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Validate Beneficiary</h3>

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
              {requests.filter(r => r.status === "PENDING").length === 0 && (
                <tr>
                  <td colSpan="4" style={styles.empty}>
                    No pending requests
                  </td>
                </tr>
              )}

              {requests
                .filter(r => r.status === "PENDING")
                .map((r, i) => (
                  <tr key={i}>
                    <td style={styles.td}>{r.scheme}</td>
                    <td style={styles.td}>{r.purpose}</td>
                    <td style={styles.td}>{r.amount}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.approveBtn}
                        onClick={() => approve(i)}
                      >
                        Approve
                      </button>

                      <button
                        style={styles.rejectBtn}
                        onClick={() => reject(i)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        {/* ================= ALLOCATE FUNDS ================= */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Allocate Funds to Beneficiary</h3>

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
              {requests.filter(r => r.status === "APPROVED").length === 0 && (
                <tr>
                  <td colSpan="4" style={styles.empty}>
                    No approved beneficiaries
                  </td>
                </tr>
              )}

              {requests
                .filter(r => r.status === "APPROVED")
                .map((r, i) => (
                  <tr key={i}>
                    <td style={styles.td}>{r.scheme}</td>
                    <td style={styles.td}>{r.purpose}</td>
                    <td style={styles.td}>{r.amount}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.primaryBtn}
                        onClick={() => allocate(i)}
                      >
                        Allocate Funds
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

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
    width: 900,
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

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    marginBottom: 10,
    color: "#071535",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 14,
    boxSizing: "border-box",
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

  primaryBtn: {
    padding: "8px 14px",
    borderRadius: 4,
    border: "none",
    background: "#071535",
    color: "#fff",
    cursor: "pointer",
  },

  approveBtn: {
    padding: "6px 12px",
    marginRight: 6,
    borderRadius: 4,
    border: "none",
    background: "#071535",
    color: "#fff",
    cursor: "pointer",
  },

  rejectBtn: {
    padding: "6px 12px",
    borderRadius: 4,
    border: "none",
    background: "#999",
    color: "#fff",
    cursor: "pointer",
  },
};

export default SchemeDashboard;
