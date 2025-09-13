import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/components/WalletProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MyApplications from "./pages/MyApplications";
import BountyDetails from "./pages/BountyDetails";
import Technology from "./pages/Technology";
import Documentation from "./pages/Documentation";
import GitHubPage from "./pages/GitHub";
import NotFound from "./pages/NotFound";
import "./index.css";

const App = () => (
  <WalletProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/bounty/:id" element={<BountyDetails />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/github" element={<GitHubPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </WalletProvider>
);

export default App;
