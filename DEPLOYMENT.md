# Confidential Bounty Board - Deployment Guide

## Project Overview

This is a decentralized bounty platform built with React, TypeScript, and Solidity. The platform allows users to create and manage bounties with privacy-preserving features.

## Features Completed

✅ **Frontend Refactoring**
- Real wallet connection using wagmi and viem
- Removed all Lovable references and branding
- Updated browser favicon with custom shield design
- All code comments and documentation in English

✅ **Smart Contract**
- Complete Solidity contract for bounty management
- Application and submission system
- User reputation tracking
- Event logging for transparency

✅ **Project Structure**
- Modern React + TypeScript + Vite setup
- Tailwind CSS for styling
- shadcn/ui components
- Hardhat for smart contract development

## Deployment Steps

### 1. Environment Setup

Create a `.env` file with the following variables:

```env
# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Contract Configuration
VITE_CONTRACT_ADDRESS=your_contract_address
VITE_RPC_URL=https://sepolia.rpc.zama.ai

# Network Configuration
VITE_CHAIN_ID=11155111

# Hardhat Configuration
SEPOLIA_RPC_URL=https://sepolia.rpc.zama.ai
SEPOLIA_PRIVATE_KEY=your_private_key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build Project

```bash
npm run build
```

### 4. Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

#### Option B: GitHub Integration
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### 5. Smart Contract Deployment

```bash
# Compile contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy:sepolia

# Deploy to local network
npm run deploy:local
```

## Project Structure

```
confidential-bounty-board/
├── contracts/           # Smart contracts
│   └── ConfidentialBountyBoard.sol
├── scripts/            # Deployment scripts
│   └── deploy.ts
├── src/                # Frontend source code
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   └── lib/           # Utilities and configurations
├── public/            # Static assets
├── test/              # Contract tests
└── dist/              # Build output
```

## Key Features

### Frontend
- **Wallet Integration**: Connect with MetaMask, WalletConnect, and other Web3 wallets
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components
- **Type Safety**: Full TypeScript implementation

### Smart Contract
- **Bounty Management**: Create, manage, and track bounties
- **Application System**: Submit and manage applications
- **Submission Tracking**: Submit and verify work
- **Reputation System**: Track user reputation and earnings
- **Event Logging**: Comprehensive event system for transparency

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `VITE_CONTRACT_ADDRESS` | Deployed contract address | Yes |
| `VITE_RPC_URL` | RPC URL for blockchain connection | Yes |
| `VITE_CHAIN_ID` | Chain ID (11155111 for Sepolia) | Yes |
| `SEPOLIA_RPC_URL` | RPC URL for contract deployment | Yes |
| `SEPOLIA_PRIVATE_KEY` | Private key for deployment | Yes |

## Testing

```bash
# Run contract tests
npm test

# Run frontend tests
npm run test:frontend
```

## Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Project builds successfully
- [ ] Smart contract deployed
- [ ] Contract address updated in environment
- [ ] Frontend deployed to Vercel
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Analytics configured (if needed)

## Support

For issues or questions:
1. Check the README.md file
2. Review the smart contract code
3. Check environment variable configuration
4. Verify network connectivity

## License

MIT License - see LICENSE file for details.
