import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock, Users, DollarSign, Eye, Shield, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mockBountyDetails = {
  "1": {
    id: "1",
    title: "Smart Contract Audit",
    description: "Conduct a comprehensive security audit of our DeFi protocol smart contracts. Looking for experienced auditors familiar with Solidity and common vulnerabilities. The audit should cover reentrancy attacks, integer overflow/underflow, access control vulnerabilities, and gas optimization opportunities.",
    fullDescription: "We are seeking an experienced smart contract auditor to conduct a thorough security review of our DeFi lending protocol. The protocol consists of 5 main contracts totaling approximately 2,000 lines of Solidity code.\n\nKey Requirements:\n• 3+ years of smart contract auditing experience\n• Familiarity with common DeFi vulnerabilities\n• Experience with automated testing tools (Slither, Mythril)\n• Previous audit reports as references\n\nDeliverables:\n• Comprehensive audit report with severity classifications\n• Detailed vulnerability descriptions and remediation steps\n• Gas optimization recommendations\n• Final security assessment score",
    reward: "15,000 USDC",
    deadline: "14 days",
    applicants: 8,
    difficulty: "Hard" as const,
    category: "Security & Auditing",
    requirements: [
      "3+ years smart contract auditing experience",
      "Solidity expertise with DeFi protocols",
      "Experience with security testing tools",
      "Previous audit portfolio required"
    ],
    skills: ["Solidity", "Security Auditing", "DeFi", "Testing"],
    estimatedTime: "2-3 weeks",
    contactMethod: "Encrypted messaging through platform"
  }
};

const BountyDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [application, setApplication] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const bounty = mockBountyDetails[id as keyof typeof mockBountyDetails];

  if (!bounty) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Bounty Not Found</h2>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleApply = () => {
    if (!application.trim()) {
      toast({
        title: "Application Required",
        description: "Please provide your application details",
        variant: "destructive",
      });
      return;
    }

    setHasApplied(true);
    toast({
      title: "Application Submitted",
      description: "Your confidential application has been submitted successfully",
    });
    setApplication("");
  };

  const difficultyColors = {
    Easy: "bg-primary/20 text-primary border-primary/30",
    Medium: "bg-accent/20 text-accent border-accent/30", 
    Hard: "bg-destructive/20 text-destructive border-destructive/30"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              <Eye className="w-3 h-3 mr-1" />
              Confidential
            </Badge>
            <Badge className={`${difficultyColors[bounty.difficulty]} border`}>
              {bounty.difficulty}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{bounty.title}</h1>
              <p className="text-lg text-muted-foreground">{bounty.category}</p>
            </div>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Description
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {bounty.fullDescription}
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Requirements</h3>
              <ul className="space-y-2">
                {bounty.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {bounty.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Bounty Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>Reward</span>
                  </div>
                  <span className="font-semibold text-foreground">{bounty.reward}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Deadline</span>
                  </div>
                  <span className="font-medium text-foreground">{bounty.deadline}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Applicants</span>
                  </div>
                  <span className="font-medium text-foreground">{bounty.applicants} applied</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Estimated Time</span>
                  </div>
                  <span className="font-medium text-foreground">{bounty.estimatedTime}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Apply Secretly</h3>
              {hasApplied ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">Application Submitted</h4>
                  <p className="text-muted-foreground mb-4">
                    Your confidential application has been encrypted and submitted
                  </p>
                  <Link to="/my-applications">
                    <Button variant="outline">View My Applications</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Describe your experience and approach to this bounty..."
                    value={application}
                    onChange={(e) => setApplication(e.target.value)}
                    className="min-h-32"
                  />
                  <Button 
                    onClick={handleApply}
                    disabled={isApplying}
                    className="w-full"
                  >
                    {isApplying ? "Encrypting..." : "Submit Confidential Application"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    🔐 Your application will be encrypted using FHE technology
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountyDetails;