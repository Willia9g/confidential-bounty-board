// Contract interaction utilities for Confidential Bounty Board
import { ethers } from 'ethers';

// Contract ABI - This would be generated from the compiled contract
export const CONTRACT_ABI = [
  // Events
  "event BountyCreated(uint256 indexed bountyId, address indexed creator, string title)",
  "event ApplicationSubmitted(uint256 indexed applicationId, uint256 indexed bountyId, address indexed applicant)",
  "event ApplicationAccepted(uint256 indexed applicationId, address indexed applicant)",
  "event SubmissionSubmitted(uint256 indexed submissionId, uint256 indexed applicationId, address indexed submitter)",
  "event BountyCompleted(uint256 indexed bountyId, address indexed applicant, uint32 rewardAmount)",
  "event ReputationUpdated(address indexed user, uint32 reputation)",
  
  // Functions
  "function createBounty(string memory _title, string memory _description, string memory _requirements, uint256 _rewardAmount, uint256 _deadline, uint8 _difficulty, uint8 _category) external returns (uint256)",
  "function submitApplication(uint256 bountyId, string memory _proposal, bytes calldata experienceLevel, bytes calldata estimatedTime, bytes calldata inputProof) external returns (uint256)",
  "function acceptApplication(uint256 applicationId) external",
  "function submitWork(uint256 applicationId, string memory _submissionHash, bytes calldata quality, bytes calldata inputProof) external returns (uint256)",
  "function verifySubmission(uint256 submissionId, bool isVerified) external",
  "function updateUserProfile(string memory _profileHash, bytes calldata skillLevel, bytes calldata inputProof) external",
  "function verifyUser(address user, bool isVerified) external",
  "function updateReputation(address user, bytes calldata reputation, bytes calldata inputProof) external",
  "function getBountyInfo(uint256 bountyId) external view returns (string memory, string memory, string memory, uint8, uint8, bool, bool, address, uint256, uint256)",
  "function getApplicationInfo(uint256 applicationId) external view returns (uint8, uint8, bool, bool, string memory, address, uint256)",
  "function getSubmissionInfo(uint256 submissionId) external view returns (uint8, bool, string memory, address, uint256)",
  "function getUserProfile(address user) external view returns (uint8, bool, string memory)",
  "function getUserReputation(address user) external view returns (uint8)",
  "function pauseBounty(uint256 bountyId) external",
  "function setVerifier(address _verifier) external"
];

// Contract configuration
export const CONTRACT_CONFIG = {
  address: import.meta.env.VITE_CONTRACT_ADDRESS || '',
  chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '11155111'), // Sepolia
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/',
};

// Contract instance factory
export const getContract = (provider: ethers.Provider) => {
  if (!CONTRACT_CONFIG.address) {
    throw new Error('Contract address not configured');
  }
  
  return new ethers.Contract(
    CONTRACT_CONFIG.address,
    CONTRACT_ABI,
    provider
  );
};

// Contract interaction functions
export class BountyContract {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor(provider: ethers.Provider, signer: ethers.Signer) {
    this.contract = getContract(provider);
    this.signer = signer;
  }

  // Create a new bounty
  async createBounty(
    title: string,
    description: string,
    requirements: string,
    rewardAmount: number,
    deadline: number,
    difficulty: number,
    category: number
  ) {
    const tx = await this.contract.connect(this.signer).createBounty(
      title,
      description,
      requirements,
      ethers.parseEther(rewardAmount.toString()),
      deadline,
      difficulty,
      category
    );
    return await tx.wait();
  }

  // Submit an application for a bounty
  async submitApplication(
    bountyId: number,
    proposal: string,
    experienceLevel: Uint8Array,
    estimatedTime: Uint8Array,
    inputProof: Uint8Array
  ) {
    const tx = await this.contract.connect(this.signer).submitApplication(
      bountyId,
      proposal,
      experienceLevel,
      estimatedTime,
      inputProof
    );
    return await tx.wait();
  }

  // Accept an application
  async acceptApplication(applicationId: number) {
    const tx = await this.contract.connect(this.signer).acceptApplication(applicationId);
    return await tx.wait();
  }

  // Submit work for an application
  async submitWork(
    applicationId: number,
    submissionHash: string,
    quality: Uint8Array,
    inputProof: Uint8Array
  ) {
    const tx = await this.contract.connect(this.signer).submitWork(
      applicationId,
      submissionHash,
      quality,
      inputProof
    );
    return await tx.wait();
  }

  // Get bounty information
  async getBountyInfo(bountyId: number) {
    return await this.contract.getBountyInfo(bountyId);
  }

  // Get application information
  async getApplicationInfo(applicationId: number) {
    return await this.contract.getApplicationInfo(applicationId);
  }

  // Get submission information
  async getSubmissionInfo(submissionId: number) {
    return await this.contract.getSubmissionInfo(submissionId);
  }

  // Get user profile
  async getUserProfile(userAddress: string) {
    return await this.contract.getUserProfile(userAddress);
  }

  // Get user reputation
  async getUserReputation(userAddress: string) {
    return await this.contract.getUserReputation(userAddress);
  }

  // Update user profile
  async updateUserProfile(
    profileHash: string,
    skillLevel: Uint8Array,
    inputProof: Uint8Array
  ) {
    const tx = await this.contract.connect(this.signer).updateUserProfile(
      profileHash,
      skillLevel,
      inputProof
    );
    return await tx.wait();
  }

  // Listen to events
  onBountyCreated(callback: (bountyId: number, creator: string, title: string) => void) {
    this.contract.on('BountyCreated', callback);
  }

  onApplicationSubmitted(callback: (applicationId: number, bountyId: number, applicant: string) => void) {
    this.contract.on('ApplicationSubmitted', callback);
  }

  onApplicationAccepted(callback: (applicationId: number, applicant: string) => void) {
    this.contract.on('ApplicationAccepted', callback);
  }

  onSubmissionSubmitted(callback: (submissionId: number, applicationId: number, submitter: string) => void) {
    this.contract.on('SubmissionSubmitted', callback);
  }

  onBountyCompleted(callback: (bountyId: number, applicant: string, rewardAmount: number) => void) {
    this.contract.on('BountyCompleted', callback);
  }

  onReputationUpdated(callback: (user: string, reputation: number) => void) {
    this.contract.on('ReputationUpdated', callback);
  }

  // Remove event listeners
  removeAllListeners() {
    this.contract.removeAllListeners();
  }
}

// FHE encryption utilities (placeholder - would integrate with Zama's FHE library)
export class FHEUtils {
  // Encrypt a number for FHE operations
  static async encryptNumber(value: number): Promise<Uint8Array> {
    // This would use Zama's FHE encryption
    // For now, return a placeholder
    return new Uint8Array([value]);
  }

  // Generate input proof for FHE operations
  static async generateInputProof(encryptedValue: Uint8Array): Promise<Uint8Array> {
    // This would generate a proof for the encrypted value
    // For now, return a placeholder
    return new Uint8Array([1, 2, 3, 4]);
  }

  // Decrypt a number from FHE operations
  static async decryptNumber(encryptedValue: Uint8Array): Promise<number> {
    // This would use Zama's FHE decryption
    // For now, return a placeholder
    return encryptedValue[0] || 0;
  }
}

// Network utilities
export const switchToSepolia = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
    });
  } catch (error: any) {
    // If the chain doesn't exist, add it
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xaa36a7',
          chainName: 'Sepolia Test Network',
          rpcUrls: ['https://sepolia.infura.io/v3/'],
          nativeCurrency: {
            name: 'SepoliaETH',
            symbol: 'SepoliaETH',
            decimals: 18,
          },
          blockExplorerUrls: ['https://sepolia.etherscan.io'],
        }],
      });
    } else {
      throw error;
    }
  }
};

// Export types
export interface BountyInfo {
  title: string;
  description: string;
  requirements: string;
  difficulty: number;
  category: number;
  isActive: boolean;
  isCompleted: boolean;
  creator: string;
  createdAt: number;
  deadline: number;
}

export interface ApplicationInfo {
  experienceLevel: number;
  estimatedTime: number;
  isAccepted: boolean;
  isCompleted: boolean;
  proposal: string;
  applicant: string;
  submittedAt: number;
}

export interface SubmissionInfo {
  quality: number;
  isVerified: boolean;
  submissionHash: string;
  submitter: string;
  submittedAt: number;
}

export interface UserProfile {
  skillLevel: number;
  isVerified: boolean;
  profileHash: string;
}
