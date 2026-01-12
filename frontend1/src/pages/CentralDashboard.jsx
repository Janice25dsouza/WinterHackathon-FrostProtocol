import { useState } from "react";
import {
  getRequests,
  approveRequest,
  rejectRequest
} from "../data/schemeRequests";

import { getContract } from "../utils/getContract";
function CentralDashboard() {
  const [requests, setRequests] = useState(getRequests());

  async function approve(index) {
    const req = requests[index];

    // BLOCKCHAIN CALL (later)
    // const contract = await getContract();
    // await contract.createIntent(...)

    approveRequest(index);
    setRequests([...getRequests()]);
    alert("Approved");
  }

  function decline(index) {
    rejectRequest(index);
    setRequests([...getRequests()]);
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Central Government Dashboard</h2>

      {requests.length === 0 ? (
        <p>No scheme requests</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
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
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CentralDashboard;
