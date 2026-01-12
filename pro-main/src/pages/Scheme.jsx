import { useState } from "react";
import { getContract } from "../contract";

function Scheme() {
  const [parentId, setParentId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [validUntil, setValidUntil] = useState("");

  async function requestFunds() {
    const contract = await getContract();
    await contract.createIntent(
      parentId,
      purpose,
      amount,
      Math.floor(new Date(validUntil).getTime() / 1000)
    );
    alert("Funds requested from central");
  }

  return (
    <div>
      <h2>Scheme / Ministry Dashboard</h2>

      <h3>Request Funds from Central</h3>
      <input placeholder="Parent Intent ID" onChange={e => setParentId(e.target.value)} />
      <input placeholder="Purpose" onChange={e => setPurpose(e.target.value)} />
      <input placeholder="Amount" onChange={e => setAmount(e.target.value)} />
      <input type="date" onChange={e => setValidUntil(e.target.value)} />
      <button onClick={requestFunds}>Request</button>
    </div>
  );
}

export default Scheme;
