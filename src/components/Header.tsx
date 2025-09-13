import { Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";
import cryptoHeaderImage from "@/assets/crypto-header.jpg";

const Header = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${cryptoHeaderImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      
      {/* Navigation */}
      <div className="relative z-10 py-4 border-b border-border/20">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Shield className="h-6 w-6 text-primary" />
            Secret Bounties
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/technology" className="text-muted-foreground hover:text-primary transition-colors">
              Technology
            </Link>
            <Link to="/documentation" className="text-muted-foreground hover:text-primary transition-colors">
              Docs
            </Link>
            <Link to="/github" className="text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/my-applications">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <FileText className="w-4 h-4 mr-2" />
                My Applications
              </Button>
            </Link>
            <WalletConnect />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/20 backdrop-blur-sm border border-primary/30">
              <Shield className="h-8 w-8 text-primary" style={{ filter: 'drop-shadow(var(--confidential-glow))' }} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Secret Task Bounties
              </h1>
              <p className="text-lg text-primary font-medium tracking-wide mt-2">
                Confidential by FHE
              </p>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Discover encrypted bounties from DAOs worldwide. Complete tasks with full privacy protection 
            through Fully Homomorphic Encryption.
          </p>
          
          <div className="flex items-center gap-4 mt-8">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              🔐 Zero Knowledge Proofs
            </div>
            <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
              ⚡ Instant Payouts
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;