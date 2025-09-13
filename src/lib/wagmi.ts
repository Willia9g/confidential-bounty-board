import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { 
  injected, 
  metaMask, 
  walletConnect, 
  coinbaseWallet,
  safe
} from 'wagmi/connectors'

// Get projectId from https://cloud.walletconnect.com
export const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'e08e99d213c331aa0fd00f625de06e66'

// Create wagmi config with multiple wallet support
export const config = createConfig({
  chains: [sepolia],
  connectors: [
    // Browser extension wallets
    injected(),
    metaMask(),
    coinbaseWallet({
      appName: 'Confidential Bounty Board',
      appLogoUrl: 'https://example.com/logo.png',
    }),
    safe(),
    // WalletConnect for mobile wallets
    walletConnect({ 
      projectId,
      metadata: {
        name: 'Confidential Bounty Board',
        description: 'Privacy-preserving bounty platform',
        url: 'https://confidential-bounty-board.vercel.app',
        icons: ['https://example.com/icon.png']
      }
    }),
  ],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL || 'https://sepolia.rpc.zama.ai'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
