const hre = require("hardhat");

async function main() {
  const FundFlowDemo = await hre.ethers.getContractFactory("FundFlowDemo");

  const contract = await FundFlowDemo.deploy();
  await contract.waitForDeployment();

  console.log("FundFlowDemo deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
