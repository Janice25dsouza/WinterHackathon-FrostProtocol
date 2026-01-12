import { useEffect, useState } from "react";
import { getContract } from "../contract";

function Central() {
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [requests, setRequests] = useState([]);

  async function createRootIntent() {
    const contract = await getContract();
    await contract.createIntent(
      0,
      purpose,
      amount,
      Math.floor(new Date(validUntil).getTime() / 1000)
    );
    alert("Root intent created");
  }

  async function loadRequests() {
    const contract = await getContract();
    const total = await contract.requestCounter();
    let arr = [];

    for (let i = 1; i <= total; i++) {
      const req = await contract.getSpendRequest(i);
      if (!req.approved) arr.push({ ...req, id: i });
    }
    setRequests(arr);
  }

  async function approve(id) {
    const contract = await getContract();
    await contract.approveSpend(id);
    alert("Approved");
  }

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div>
      <h2>Central Government Dashboard</h2>

      <h3>Create Root Intent</h3>
      <input placeholder="Purpose" onChange={e => setPurpose(e.target.value)} />
      <input placeholder="Amount" onChange={e => setAmount(e.target.value)} />
      <input type="date" onChange={e => setValidUntil(e.target.value)} />
      <button onClick={createRootIntent}>Create</button>

      <h3>Spend Requests</h3>
      {requests.map(r => (
        <div key={r.id}>
          <p>{r.description} — {r.amount.toString()}</p>
          <button onClick={() => approve(r.id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}

export default Central;
