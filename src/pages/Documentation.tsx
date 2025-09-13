import { Book, Code, Shield, Zap, Users, FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Documentation = () => {
  const sections = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Getting Started",
      description: "Learn the basics of Secret Bounties platform",
      items: [
        "Platform Overview",
        "Creating Your First Bounty",
        "Wallet Connection Guide",
        "Understanding FHE Technology"
      ]
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Developer Guide",
      description: "Technical documentation for developers",
      items: [
        "Smart Contract Integration",
        "FHE Circuit Development",
        "API Reference",
        "SDK Documentation"
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "DAO Integration",
      description: "How DAOs can leverage our platform",
      items: [
        "Creating DAO Bounties",
        "Multi-signature Setup",
        "Governance Integration",
        "Treasury Management"
      ]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Advanced Features",
      description: "Explore advanced platform capabilities",
      items: [
        "Zero-Knowledge Proofs",
        "Private Computation",
        "Encrypted Messaging",
        "Anonymous Payments"
      ]
    }
  ];

  const quickLinks = [
    { title: "API Documentation", url: "/docs/api", description: "Complete API reference and examples" },
    { title: "Smart Contract ABI", url: "/docs/contracts", description: "Contract interfaces and deployment guides" },
    { title: "FHE Examples", url: "/docs/fhe", description: "Sample implementations and use cases" },
    { title: "Security Audit", url: "/docs/security", description: "Third-party security assessment reports" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <Book className="h-6 w-6 text-primary" />
            Secret Bounties
          </Link>
          <Link to="/">
            <Button variant="outline">Back to Bounties</Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
              <Book className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guides, tutorials, and references for building with Secret Bounties platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickLinks.map((link, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors cursor-pointer group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                    <FileText className="h-5 w-5" />
                    {link.title}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{link.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Documentation Sections */}
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                      {section.icon}
                    </div>
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer group">
                        <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></div>
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">{item}</span>
                        <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Section */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm mt-16">
            <CardHeader>
              <CardTitle className="text-2xl">Need Help?</CardTitle>
              <CardDescription>Get support from our community and development team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-4 rounded-2xl bg-primary/20 border border-primary/30 w-fit mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Discord Community</h3>
                  <p className="text-muted-foreground text-sm mb-4">Join our active community for real-time support and discussions.</p>
                  <Button variant="outline" size="sm">Join Discord</Button>
                </div>
                <div className="text-center">
                  <div className="p-4 rounded-2xl bg-primary/20 border border-primary/30 w-fit mx-auto mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Submit Issue</h3>
                  <p className="text-muted-foreground text-sm mb-4">Report bugs or request features on our GitHub repository.</p>
                  <Button variant="outline" size="sm">Create Issue</Button>
                </div>
                <div className="text-center">
                  <div className="p-4 rounded-2xl bg-primary/20 border border-primary/30 w-fit mx-auto mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Priority Support</h3>
                  <p className="text-muted-foreground text-sm mb-4">Get dedicated support for enterprise and high-priority use cases.</p>
                  <Button variant="outline" size="sm">Contact Us</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documentation;