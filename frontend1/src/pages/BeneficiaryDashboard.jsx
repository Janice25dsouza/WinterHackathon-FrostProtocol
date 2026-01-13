import { useState } from "react";
import { addBeneficiaryRequest } from "../data/beneficiaryRequests";

function BeneficiaryDashboard() {
  const [scheme, setScheme] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");

  function submitRequest() {
    if (!scheme || !beneficiary || !purpose || !amount) {
      alert("Fill all fields");
      return;
    }

    addBeneficiaryRequest({
      scheme,            // "scheme1" | "scheme2"
      beneficiary,       // "ben1" | "ben2" | "ben3"
      purpose,
      amount
    });

    alert("✅ Request sent to Scheme");
    setScheme("");
    setBeneficiary("");
    setPurpose("");
    setAmount("");
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Beneficiary Dashboard</h2>

      {/* Scheme selector */}
      <select value={scheme} onChange={(e) => setScheme(e.target.value)}>
        <option value="">Select Scheme</option>
        <option value="scheme1">Scheme 1</option>
        <option value="scheme2">Scheme 2</option>
      </select>

      <br /><br />

      {/* Beneficiary selector */}
      <select value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)}>
        <option value="">Select Beneficiary</option>
        <option value="ben1">Beneficiary 1</option>
        <option value="ben2">Beneficiary 2</option>
        <option value="ben3">Beneficiary 3</option>
      </select>

      <br /><br />

      <input
        placeholder="Purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={submitRequest}>Request Funds</button>
    </div>
  );
}

export default BeneficiaryDashboard;
