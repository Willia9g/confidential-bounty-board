import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance, 
  useSwitchChain,
  useChainId
} from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { formatEther } from 'viem';

const WalletConnect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openExplorer = () => {
    if (address) {
      const explorerUrl = `https://sepolia.etherscan.io/address/${address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  const switchToSepolia = () => {
    switchChain({ chainId: sepolia.id });
  };

  const handleConnect = (connector: any) => {
    connect({ connector });
    setIsOpen(false);
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-primary">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <span className="text-xs text-muted-foreground">
            {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ETH` : '0 ETH'}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-primary hover:bg-primary/20"
            onClick={copyAddress}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-primary hover:bg-primary/20"
            onClick={openExplorer}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
        {chainId !== sepolia.id && (
          <Button
            variant="outline"
            size="sm"
            onClick={switchToSepolia}
            className="text-xs"
          >
            Switch to Sepolia
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">
              {connector?.name || 'Wallet'}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={disconnect}>
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to the Confidential Bounty Board
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              variant="outline"
              className="w-full justify-start h-auto p-4"
              onClick={() => handleConnect(connector)}
              disabled={isPending}
            >
              <div className="flex items-center space-x-3">
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Wallet className="h-3 w-3" />
                  </div>
                )}
                <div className="text-left">
                  <div className="font-medium">{connector.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {connector.type === 'injected' ? 'Browser Extension' : 
                     connector.type === 'walletConnect' ? 'Mobile & Desktop' :
                     'Hardware Wallet'}
                  </div>
                </div>
              </div>
            </Button>
          ))}
          
          {error && (
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">
                {error.message}
              </span>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground text-center pt-2">
            Don't have a wallet? Install MetaMask or another Web3 wallet to get started.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnect;