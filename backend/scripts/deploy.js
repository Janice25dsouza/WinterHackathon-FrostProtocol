const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with account:", deployer.address);

  const ContractFactory = await hre.ethers.getContractFactory(
    "IntentBasedFundControl"
  );

  const contract = await ContractFactory.deploy(deployer.address);

  await contract.waitForDeployment();   // ✅ Ethers v6 fix

  const contractAddress = await contract.getAddress();

  console.log("Contract deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
