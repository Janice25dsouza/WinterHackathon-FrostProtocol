import { useState } from "react";
import { addBeneficiaryRequest } from "../data/beneficiaryRequests";

function BeneficiaryDashboard() {
  const [scheme, setScheme] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");

  function submitRequest() {
    addBeneficiaryRequest({
      scheme,
      purpose,
      amount,
      status: "PENDING",
    });

    alert("Request sent to Scheme");
    setScheme("");
    setPurpose("");
    setAmount("");
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Beneficiary Dashboard</h2>

      <select value={scheme} onChange={(e) => setScheme(e.target.value)}>
        <option value="">Select Scheme</option>
        <option value="Scheme A">Scheme A</option>
        <option value="Scheme B">Scheme B</option>
      </select>

      <input placeholder="Purpose" value={purpose}
        onChange={(e) => setPurpose(e.target.value)} />

      <input placeholder="Amount (paise)" value={amount}
        onChange={(e) => setAmount(e.target.value)} />

      <button onClick={submitRequest}>Request Funds</button>
    </div>
  );
}

export default BeneficiaryDashboard;
