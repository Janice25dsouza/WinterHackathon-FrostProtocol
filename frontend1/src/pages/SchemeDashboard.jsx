import { useState } from "react";

// Central fund requests
import { addRequest } from "../data/schemeRequests";

// Beneficiary requests
import {
  getBeneficiaryRequests,
  approveBeneficiary,
  rejectBeneficiary
} from "../data/beneficiaryRequests";

function SchemeDashboard() {
  /* ---------------- CENTRAL FUND REQUEST ---------------- */
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");

  function submitFundRequest() {
    if (!purpose || !amount) {
      alert("Fill all fields");
      return;
    }

    addRequest({
      scheme: "Scheme User",
      purpose,
      amount,
      timestamp: Date.now(),
    });

    alert("Fund request sent to Central Government");
    setPurpose("");
    setAmount("");
  }

  /* ---------------- BENEFICIARY FLOW ---------------- */
  const [requests, setRequests] = useState(getBeneficiaryRequests());

  function approve(index) {
    approveBeneficiary(index);
    setRequests([...getBeneficiaryRequests()]);
  }

  function reject(index) {
    rejectBeneficiary(index);
    setRequests([...getBeneficiaryRequests()]);
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Scheme Dashboard</h2>

      {/* ================= REQUEST FUNDS ================= */}
      <section style={{ marginBottom: 40 }}>
        <h3>Request Funds from Central Government</h3>

        <input
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <input
          placeholder="Amount (paise)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <br />
        <button onClick={submitFundRequest}>
          Request Funds
        </button>
      </section>

      {/* ================= VALIDATE BENEFICIARY ================= */}
      <section style={{ marginBottom: 40 }}>
        <h3>Validate Beneficiary</h3>

        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Scheme</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.filter(r => r.status === "PENDING").length === 0 && (
              <tr>
                <td colSpan="4">No pending beneficiary requests</td>
              </tr>
            )}

            {requests
              .filter(r => r.status === "PENDING")
              .map((r, i) => (
                <tr key={i}>
                  <td>{r.scheme}</td>
                  <td>{r.purpose}</td>
                  <td>{r.amount}</td>
                  <td>
                    <button onClick={() => approve(i)}>Approve</button>
                    <button onClick={() => reject(i)}>Reject</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      {/* ================= ALLOCATE FUNDS ================= */}
      <section>
        <h3>Allocate Funds to Beneficiary</h3>

        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Scheme</th>
              <th>Purpose</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {requests.filter(r => r.status === "APPROVED").length === 0 && (
              <tr>
                <td colSpan="3">No approved beneficiaries</td>
              </tr>
            )}

            {requests
              .filter(r => r.status === "APPROVED")
              .map((r, i) => (
                <tr key={i}>
                  <td>{r.scheme}</td>
                  <td>{r.purpose}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SchemeDashboard;
