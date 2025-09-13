import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Eye, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const mockApplications = [
  {
    id: "1",
    bountyId: "1",
    title: "Smart Contract Audit",
    category: "Security & Auditing",
    appliedDate: "2024-01-15",
    status: "pending" as const,
    reward: "15,000 USDC",
  },
  {
    id: "2", 
    bountyId: "3",
    title: "Tokenomics Research",
    category: "Research & Strategy",
    appliedDate: "2024-01-14",
    status: "accepted" as const,
    reward: "5,000 USDC",
  },
  {
    id: "3",
    bountyId: "5", 
    title: "Zero-Knowledge Protocol",
    category: "Cryptography",
    appliedDate: "2024-01-12",
    status: "rejected" as const,
    reward: "25,000 USDC",
  },
];

const MyApplications = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-primary" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-accent" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-primary/20 text-primary border-primary/30";
      case "rejected":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-accent/20 text-accent border-accent/30";
    }
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
            <p className="text-muted-foreground">Track your secret bounty applications</p>
          </div>
        </div>

        {mockApplications.length === 0 ? (
          <Card className="p-12 text-center">
            <Eye className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Applications Yet
            </h3>
            <p className="text-muted-foreground mb-6">
              You haven't applied to any bounties yet. Start exploring confidential tasks.
            </p>
            <Link to="/">
              <Button>Browse Bounties</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {mockApplications.map((application) => (
              <Card key={application.id} className="p-6 border-border/50 bg-gradient-to-br from-card to-card/80 hover:shadow-[var(--shadow-card)] transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {application.title}
                      </h3>
                      <Badge className={`${getStatusColor(application.status)} border flex items-center gap-1`}>
                        {getStatusIcon(application.status)}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {application.category} • Applied {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Reward: </span>
                        <span className="font-semibold text-foreground">{application.reward}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to={`/bounty/${application.bountyId}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;