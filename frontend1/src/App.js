import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contractConfig";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  // 1️⃣ Connect MetaMask
  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);

    // 2️⃣ Create Provider & Signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // 3️⃣ Create Contract Instance
    const contractInstance = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    setContract(contractInstance);
  }

  // 4️⃣ Read-only test function (safe)
  
  async function getAuthority() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractInstance = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const authority = await contractInstance.centralAuthority();
    alert(`Authority Address: ${authority}`);
  } catch (error) {
    console.error(error);
    alert("Error reading authority");
  }
}


  return (
    <div style={{ padding: 30 }}>
      <h2>Intent Based Fund Control</h2>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {account}</p>
          <button onClick={getAuthority}>
            Get Authority Address
          </button>
        </>
      )}
    </div>
  );
}

export default App;
