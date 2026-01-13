import { useState } from "react";
import { getRequests, approveRequest, rejectRequest } from "../data/schemeRequests";
import { getContract } from "../utils/getContract";

function CentralDashboard() {
  const [requests, setRequests] = useState(getRequests());

  async function approveSchemeRequest(index) {
    const req = requests[index];
    const contract = await getContract();

    await contract.approveSchemeFund(
      req.scheme,              // "scheme1" or "scheme2"
      Number(req.amount)
    );

    approveRequest(index);
    setRequests([...getRequests()]);
    alert("✅ Funds transferred to scheme");
  }

  function decline(index) {
    rejectRequest(index);
    setRequests([...getRequests()]);
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Central Dashboard</h2>

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
          {requests.map((r, i) => (
            <tr key={i}>
              <td>{r.scheme}</td>
              <td>{r.purpose}</td>
              <td>{r.amount}</td>
              <td>
                <button onClick={() => approveSchemeRequest(i)}>
                  Approve
                </button>
                <button onClick={() => decline(i)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CentralDashboard;
