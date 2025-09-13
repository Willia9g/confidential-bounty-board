import { Github, Code, Book, ExternalLink, Star, GitFork } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const GitHubPage = () => {
  const repositories = [
    {
      name: "secret-bounties-contracts",
      description: "Smart contracts for FHE-powered bounty management",
      language: "Solidity",
      stars: 247,
      forks: 43,
      topics: ["fhe", "smart-contracts", "privacy", "bounties"]
    },
    {
      name: "fhe-computation-engine",
      description: "Core FHE computation engine for private task evaluation",
      language: "Rust",
      stars: 156,
      forks: 28,
      topics: ["fhe", "cryptography", "rust", "privacy"]
    },
    {
      name: "bounty-frontend",
      description: "React frontend for the Secret Bounties platform",
      language: "TypeScript",
      stars: 89,
      forks: 19,
      topics: ["react", "typescript", "web3", "ui"]
    },
    {
      name: "zk-proof-circuits",
      description: "Zero-knowledge proof circuits for task verification",
      language: "Circom",
      stars: 203,
      forks: 31,
      topics: ["zk-proofs", "circom", "cryptography", "verification"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <Github className="h-6 w-6 text-primary" />
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
              <Github className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Open Source
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our open-source repositories powering the future of private, decentralized bounty systems.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button className="gap-2" asChild>
                <a href="https://github.com/secret-bounties" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View on GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://docs.github.com/secret-bounties" target="_blank" rel="noopener noreferrer">
                  <Book className="h-4 w-4" />
                  Documentation
                </a>
              </Button>
            </div>
          </div>

          {/* Repositories */}
          <div className="space-y-6 mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Core Repositories</h2>
            <div className="grid gap-6">
              {repositories.map((repo, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-primary">
                          <Code className="h-5 w-5" />
                          {repo.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {repo.description}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <a href={`https://github.com/secret-bounties/${repo.name}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                          View
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          {repo.language}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {repo.topics.slice(0, 3).map((topic, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contribution Guidelines */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Contributing</CardTitle>
              <CardDescription>Join our mission to build privacy-preserving bounty systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <p className="text-muted-foreground">
                  Check out our contribution guidelines and open issues. We welcome contributions from developers interested in cryptography, blockchain, and privacy technologies.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Areas of Focus</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• FHE circuit optimization and implementation</li>
                  <li>• Zero-knowledge proof system enhancements</li>
                  <li>• Smart contract security and gas optimization</li>
                  <li>• Frontend UX improvements and accessibility</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GitHubPage;