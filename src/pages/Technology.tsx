import { Shield, Lock, Zap, Database, Key, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Technology = () => {
  const features = [
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Fully Homomorphic Encryption",
      description: "Execute computations on encrypted data without ever decrypting it, ensuring complete privacy throughout the entire bounty process."
    },
    {
      icon: <Key className="h-8 w-8" />,
      title: "Zero Knowledge Proofs",
      description: "Prove task completion without revealing any sensitive information about the methodology or data used."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Encrypted State Management",
      description: "All bounty data, applications, and results remain encrypted at rest and in transit using advanced cryptographic protocols."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Private Smart Contracts",
      description: "Smart contracts that execute logic on encrypted inputs while maintaining complete confidentiality of all parameters."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            Secret Bounties
          </Link>
          <Link to="/">
            <Button variant="outline">Back to Bounties</Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              FHE Technology
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionary cryptographic technology enabling computation on encrypted data while preserving complete privacy and confidentiality.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/20 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Details */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Code className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl">How It Works</CardTitle>
                  <CardDescription>The technical foundation of our privacy-preserving bounty platform</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Encryption Layer</h3>
                <p className="text-muted-foreground">
                  All bounty data is encrypted using lattice-based cryptographic schemes that enable homomorphic operations. 
                  This allows our smart contracts to evaluate bounty conditions without ever seeing the actual data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Privacy Computation</h3>
                <p className="text-muted-foreground">
                  Bounty evaluation, matching, and payments are computed directly on encrypted values using FHE circuits. 
                  Neither the platform nor other participants can access sensitive information.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Cryptographic Proofs</h3>
                <p className="text-muted-foreground">
                  Zero-knowledge proofs ensure task completion verification while maintaining complete anonymity. 
                  Proofs are generated locally and verified on-chain without revealing any execution details.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Technology;