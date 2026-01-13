import { useState } from "react";
import {
  getRequests,
  approveRequest,
  rejectRequest
} from "../data/schemeRequests";

import { getContract } from "../utils/getContract";

async function approveScheme(schemeAddress, amount) {
  const contract = await getContract();
  const tx = await contract.approveSchemeFund(
    schemeAddress,
    amount
  );
  await tx.wait();
  alert("✅ Funds transferred to scheme");
}


function CentralDashboard() {
  const [requests, setRequests] = useState(getRequests());

  function refresh() {
    setRequests([...getRequests()]);
  }

  function approve(index) {
    approveRequest(index);
    refresh();
    alert("✅ Scheme request approved");
  }

  function decline(index) {
    rejectRequest(index);
    refresh();
    alert("❌ Scheme request rejected");
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Central Government Dashboard</h2>

      {requests.length === 0 ? (
        <p>No scheme requests</p>
      ) : (
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
                  <button onClick={() =>
                      approveScheme(
                        r.scheme === "scheme1"
                          ? SCHEME1_ADDRESS
                          : SCHEME2_ADDRESS,
                        r.amount
                      )
                    }
                  >
                    Approve & Transfer
                  </button>

                  <button onClick={() => decline(i)}>Reject</button>
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
