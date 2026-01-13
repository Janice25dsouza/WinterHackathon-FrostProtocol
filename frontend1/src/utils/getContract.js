import { ethers } from "ethers";
import ABI from "../abi/FundFlowDemo.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // redeploy = update

export async function getContract() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI.abi, // 🔥 IMPORTANT
    signer
  );
}
