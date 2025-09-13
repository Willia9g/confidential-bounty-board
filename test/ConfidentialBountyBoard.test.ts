import { expect } from "chai";
import { ethers } from "hardhat";
import { ConfidentialBountyBoard } from "../typechain-types";

describe("ConfidentialBountyBoard", function () {
  let bountyBoard: ConfidentialBountyBoard;
  let owner: any;
  let verifier: any;
  let user1: any;
  let user2: any;

  beforeEach(async function () {
    [owner, verifier, user1, user2] = await ethers.getSigners();
    
    const ConfidentialBountyBoard = await ethers.getContractFactory("ConfidentialBountyBoard");
    bountyBoard = await ConfidentialBountyBoard.deploy(verifier.address);
    await bountyBoard.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await bountyBoard.owner()).to.equal(owner.address);
    });

    it("Should set the right verifier", async function () {
      expect(await bountyBoard.verifier()).to.equal(verifier.address);
    });
  });

  describe("Bounty Creation", function () {
    it("Should create a bounty successfully", async function () {
      const title = "Test Bounty";
      const description = "A test bounty for development";
      const requirements = "Must have experience with Solidity";
      const deadline = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now
      
      // Note: In a real test, you would need to provide proper FHE encrypted values
      // For now, we'll test the basic functionality
      
      const tx = await bountyBoard.connect(user1).createBounty(
        title,
        description,
        requirements,
        deadline,
        "0x0000000000000000000000000000000000000000000000000000000000000000", // placeholder for externalEuint32
        "0x0000000000000000000000000000000000000000000000000000000000000000", // placeholder for externalEuint32
        "0x0000000000000000000000000000000000000000000000000000000000000000", // placeholder for externalEuint32
        "0x" // placeholder for inputProof
      );
      
      await expect(tx)
        .to.emit(bountyBoard, "BountyCreated")
        .withArgs(0, user1.address, title);
    });

    it("Should not create bounty with empty title", async function () {
      const deadline = Math.floor(Date.now() / 1000) + 86400;
      
      await expect(
        bountyBoard.connect(user1).createBounty(
          "",
          "Description",
          "Requirements",
          deadline,
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x"
        )
      ).to.be.revertedWith("Bounty title cannot be empty");
    });

    it("Should not create bounty with past deadline", async function () {
      const pastDeadline = Math.floor(Date.now() / 1000) - 86400; // 24 hours ago
      
      await expect(
        bountyBoard.connect(user1).createBounty(
          "Test Bounty",
          "Description",
          "Requirements",
          pastDeadline,
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x"
        )
      ).to.be.revertedWith("Deadline must be in the future");
    });
  });

  describe("User Profile", function () {
    it("Should create user profile successfully", async function () {
      const skills = "Solidity, React, TypeScript";
      
      await expect(
        bountyBoard.connect(user1).createUserProfile(
          skills,
          "0x0000000000000000000000000000000000000000000000000000000000000000", // placeholder for externalEuint32
          "0x" // placeholder for inputProof
        )
      ).to.not.be.reverted;
    });

    it("Should not create duplicate user profile", async function () {
      const skills = "Solidity, React, TypeScript";
      
      // Create first profile
      await bountyBoard.connect(user1).createUserProfile(
        skills,
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x"
      );
      
      // Try to create second profile
      await expect(
        bountyBoard.connect(user1).createUserProfile(
          skills,
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x"
        )
      ).to.be.revertedWith("Profile already exists");
    });
  });

  describe("Access Control", function () {
    it("Should only allow verifier to verify submissions", async function () {
      await expect(
        bountyBoard.connect(user1).verifySubmission(0, true, "Good work")
      ).to.be.revertedWith("Only verifier can verify submissions");
    });

    it("Should only allow verifier to update reputation", async function () {
      await expect(
        bountyBoard.connect(user1).updateUserReputation(user2.address, "0x0000000000000000000000000000000000000000000000000000000000000000")
      ).to.be.revertedWith("Only verifier can update reputation");
    });
  });
});
