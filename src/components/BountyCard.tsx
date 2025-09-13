import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Clock, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface BountyCardProps {
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

const BountyCard = ({
  id,
  title,
  description,
  reward,
  deadline,
  applicants,
  difficulty,
  category,
  isConfidential = true
}: BountyCardProps) => {
  const { toast } = useToast();
  const difficultyColors = {
    Easy: "bg-primary/20 text-primary border-primary/30",
    Medium: "bg-accent/20 text-accent border-accent/30",
    Hard: "bg-destructive/20 text-destructive border-destructive/30"
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Application Started",
      description: "Navigate to bounty details to complete your application",
    });
  };

  return (
    <Link to={`/bounty/${id}`} className="block">
      <Card className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80 hover:from-card hover:to-muted/30 transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:border-primary/20 cursor-pointer">
        {/* Confidential Badge */}
      {isConfidential && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
            <Eye className="w-3 h-3 mr-1" />
            Confidential
          </Badge>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">{category}</p>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium text-foreground">{reward}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{deadline}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{applicants} applied</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge className={`${difficultyColors[difficulty]} border`}>
            {difficulty}
          </Badge>
          
          <Button 
            variant="outline" 
            className="bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={handleApply}
          >
            Apply Secretly
          </Button>
        </div>
      </div>
    </Card>
    </Link>
  );
};

export default BountyCard;