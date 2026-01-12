import { useNavigate } from "react-router-dom";
import { getContract } from "../contract";
import { ethers } from "ethers";

function Login() {
  const navigate = useNavigate();

  async function connectWallet() {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const contract = await getContract();
    const role = await contract.roles(address);

    if (role == 1) navigate("/central");
    else if (role == 2) navigate("/scheme");
    else alert("No role assigned");
  }

  return (
    <div>
      <h2>Intent-Based Fund System</h2>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}

export default Login;
