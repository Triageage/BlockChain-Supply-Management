const hre = require("hardhat");

async function main() {
  console.log("Deploying contract...");
  const Traceability = await hre.ethers.getContractFactory("Traceabilitytest");
  console.log("Contract factory created");
  const traceability = await Traceability.deploy();
  console.log("Deployment transaction sent");
  await traceability.waitForDeployment();
  console.log("Deployment confirmed");
  const address = await traceability.getAddress();
  console.log("New contract address:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
