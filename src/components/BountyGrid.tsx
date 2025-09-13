import { useState, useEffect } from "react";
import { ethers } from "ethers";
import BountyCard from "./BountyCard";
import { BountyContract, CONTRACT_CONFIG, BountyInfo } from "@/lib/contracts/contractUtils";
import { useToast } from "@/hooks/use-toast";

interface BountyData {
  id: string;
  title: string;
  description: string;
  reward: string;
  deadline: string;
  applicants: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  isConfidential?: boolean;
}

const BountyGrid = () => {
  const [bounties, setBounties] = useState<BountyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data as fallback
  const mockBounties: BountyData[] = [
    {
      id: "1",
      title: "Smart Contract Audit",
      description: "Conduct a comprehensive security audit of our DeFi protocol smart contracts. Looking for experienced auditors familiar with Solidity and common vulnerabilities.",
      reward: "15,000 USDC",
      deadline: "14 days",
      applicants: 8,
      difficulty: "Hard",
      category: "Security & Auditing"
    },
    {
      id: "2", 
      title: "Frontend Development",
      description: "Build a responsive React dashboard for DAO governance. Must include voting interfaces, proposal management, and real-time analytics.",
      reward: "8,500 USDC",
      deadline: "21 days",
      applicants: 12,
      difficulty: "Medium",
      category: "Frontend Development"
    },
    {
      id: "3",
      title: "Tokenomics Research",
      description: "Analyze and propose improvements to our token distribution model. Research comparable projects and provide detailed recommendations.",
      reward: "5,000 USDC", 
      deadline: "10 days",
      applicants: 5,
      difficulty: "Medium",
      category: "Research & Strategy"
    },
    {
      id: "4",
      title: "Marketing Campaign",
      description: "Design and execute a comprehensive marketing strategy for our upcoming product launch. Include social media, content creation, and community engagement.",
      reward: "12,000 USDC",
      deadline: "30 days", 
      applicants: 15,
      difficulty: "Easy",
      category: "Marketing & Growth"
    },
    {
      id: "5",
      title: "Zero-Knowledge Protocol",
      description: "Implement ZK-SNARK verification system for private voting mechanism. Requires expertise in cryptographic protocols and circom.",
      reward: "25,000 USDC",
      deadline: "45 days",
      applicants: 3,
      difficulty: "Hard", 
      category: "Cryptography"
    },
    {
      id: "6",
      title: "Community Management",
      description: "Moderate Discord server, organize events, and manage community engagement for 3 months. Previous DAO experience required.",
      reward: "6,000 USDC",
      deadline: "7 days",
      applicants: 22,
      difficulty: "Easy",
      category: "Community & Support"
    }
  ];

  const fetchBounties = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if contract is configured
      if (!CONTRACT_CONFIG.address) {
        console.warn('Contract not configured, using mock data');
        setBounties(mockBounties);
        setLoading(false);
        return;
      }

      // Check if wallet is connected
      if (typeof window.ethereum === 'undefined') {
        console.warn('Wallet not available, using mock data');
        setBounties(mockBounties);
        setLoading(false);
        return;
      }

      // Create provider and contract instance
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new BountyContract(provider, provider.getSigner());

      // For now, we'll use mock data since we need to implement proper contract interaction
      // In a real implementation, you would:
      // 1. Get the total number of bounties from the contract
      // 2. Fetch each bounty's information
      // 3. Decrypt FHE-encrypted data off-chain
      // 4. Format the data for display

      setBounties(mockBounties);

    } catch (err: any) {
      console.error('Error fetching bounties:', err);
      setError(err.message || 'Failed to fetch bounties');
      setBounties(mockBounties); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBounties();
  }, []);

  const getDifficultyLabel = (difficulty: number): "Easy" | "Medium" | "Hard" => {
    if (difficulty <= 3) return "Easy";
    if (difficulty <= 6) return "Medium";
    return "Hard";
  };

  const getCategoryLabel = (category: number): string => {
    const categories = [
      "Security & Auditing",
      "Frontend Development", 
      "Backend Development",
      "Research & Strategy",
      "Marketing & Growth",
      "Cryptography",
      "Community & Support",
      "Design & UX"
    ];
    return categories[category] || "Other";
  };

  const formatDeadline = (deadline: number): string => {
    const now = Math.floor(Date.now() / 1000);
    const diff = deadline - now;
    const days = Math.ceil(diff / (24 * 60 * 60));
    
    if (days <= 0) return "Expired";
    if (days === 1) return "1 day";
    return `${days} days`;
  };

  const formatReward = (reward: string): string => {
    // Convert wei to ETH and format
    const ethValue = parseFloat(ethers.formatEther(reward));
    return `${ethValue.toLocaleString()} ETH`;
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Active Bounties
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    toast({
      title: "Warning",
      description: `Using mock data: ${error}`,
      variant: "destructive",
    });
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Active Bounties
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🔥 {bounties.length} confidential tasks available</span>
            <span>•</span>
            <span>💰 Total rewards: {bounties.reduce((sum, bounty) => sum + parseFloat(bounty.reward.replace(/[^0-9]/g, '')), 0).toLocaleString()} USDC</span>
            {!CONTRACT_CONFIG.address && (
              <span className="text-yellow-500">• Using demo data</span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bounties.map((bounty) => (
            <BountyCard
              key={bounty.id}
              {...bounty}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BountyGrid;