import { ethers } from "hardhat";

async function main() {
  console.log("Deploying ConfidentialBountyBoard contract...");

  // Get the contract factory
  const ConfidentialBountyBoard = await ethers.getContractFactory("ConfidentialBountyBoard");

  // Deploy the contract with a verifier address (you can change this to your verifier address)
  const verifierAddress = "0x742d35Cc6375C06C44952449bCDC886bDe0b5935"; // Replace with actual verifier address
  
  const bountyBoard = await ConfidentialBountyBoard.deploy(verifierAddress);

  await bountyBoard.waitForDeployment();

  const contractAddress = await bountyBoard.getAddress();
  
  console.log("ConfidentialBountyBoard deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString(),
    deployer: await bountyBoard.runner?.getAddress()
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
