import { useState } from "react";
import { schemeRequests, removeRequest } from "../data/schemeRequests";
import { getContract } from "../utils/getContract";

function CentralDashboard() {
  const [requests, setRequests] = useState(schemeRequests);

  async function approve(index) {
    const req = requests[index];
    const contract = await getContract();

    await contract.createIntent(
      0,
      req.purpose,
      req.amount,
      Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
    );

    removeRequest(index);
    setRequests([...schemeRequests]);
    alert("Approved & recorded on blockchain");
  }

  function decline(index) {
    removeRequest(index);
    setRequests([...schemeRequests]);
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Central Government Dashboard</h2>

      {requests.length === 0 ? (
        <p>No scheme requests</p>
      ) : (
        <table border="1">
          <tr>
            <th>Purpose</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>

          {requests.map((r, i) => (
            <tr key={i}>
              <td>{r.purpose}</td>
              <td>{r.amount}</td>
              <td>
                <button onClick={() => approve(i)}>Approve</button>
                <button onClick={() => decline(i)}>Decline</button>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default CentralDashboard;
