import { useState } from "react";

import { addRequest } from "../data/schemeRequests";

import {
  getBeneficiaryRequests,
  approveBeneficiary,
  rejectBeneficiary,
  markDisbursed
} from "../data/beneficiaryRequests";

import { getContract } from "../utils/getContract";

async function allocateFunds(beneficiaryAddress, amount) {
  const contract = await getContract();
  const tx = await contract.approveBeneficiaryFund(
    beneficiaryAddress,
    amount
  );
  await tx.wait();
  alert("✅ Beneficiary funded");
}

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

      const tx = await contract.approveAndTransfer(
        req.intentId,
        Number(req.amount)
      );

      await tx.wait();

      markDisbursed(index);
      refresh();

      alert("✅ Funds transferred to beneficiary!");
    } catch (err) {
      console.error(err);
      alert("❌ Blockchain transfer failed");
    }
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
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <br /><br />
        <button onClick={submitFundRequest}>
          Request Funds
        </button>
      </section>

      {/* ================= VALIDATE BENEFICIARY ================= */}
      <section style={{ marginBottom: 40 }}>
        <h3>Validate Beneficiary</h3>

        <table border="1" cellPadding="6">
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
                <td colSpan="4">No pending requests</td>
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

        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Scheme</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.filter(r => r.status === "APPROVED").length === 0 && (
              <tr>
                <td colSpan="4">No approved beneficiaries</td>
              </tr>
            )}

            {requests
              .filter(r => r.status === "APPROVED")
              .map((r, i) => (
                <tr key={i}>
                  <td>{r.scheme}</td>
                  <td>{r.purpose}</td>
                  <td>{r.amount}</td>
                  <td>
                    <button
                      onClick={() =>
                        allocateFunds(
                          BENEFICIARY_MAP[r.beneficiary],
                          r.amount
                        )
                      }
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
  );
}

export default SchemeDashboard;
