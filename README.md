# Block Mentor Platform - Bridge Application

<p align="center">
  <img src="./src/assets/icons/arbitrum-arb-logo.png" alt="Arbitrum Logo" width="100" />
  &nbsp;&nbsp;&nbsp;
  <b>⟷</b>
  &nbsp;&nbsp;&nbsp;
  <img src="./src/assets/icons/base-sepolia.png" alt="Base Logo" width="100" />
</p>

<h1 align="center">Block Mentor Bridge</h1>
<p align="center"><em>Seamless cross-chain token transfers between Arbitrum and Base</em></p>

---

A specialized cross-chain bridge application that enables seamless token transfers between different blockchain networks.

## Overview

Block Mentor Platform Bridge is a dedicated web application designed to facilitate cross-chain token transfers with a focus on security, usability, and real-time transaction tracking. It currently supports bridging between Arbitrum Sepolia and Base Sepolia networks.

<p align="center">
  <img src="./src/assets/logo.ico" alt="Block Mentor Platform" width="240" />
</p>

## Features

### Core Functionality
- **Cross-chain Token Bridging**: Transfer tokens between supported networks with minimal gas fees
- **Network Support**: 
  - Arbitrum Sepolia
  - Base Sepolia
  - *Coming soon: Optimism Sepolia, Scroll Sepolia*
- **Real-time Balance Updates**: Live tracking of wallet balances across networks
- **Transaction Status Tracking**: Monitor bridge transaction status in real-time
- **Interactive Network Selection**: Easy-to-use network switching interface
- **Supported Tokens**: Currently supports native tokens and test ERC-20 tokens on testnet networks

### User Experience
- **Responsive Design**: Fully responsive interface that works on all devices (mobile, tablet, desktop)
- **Interactive UI Components**: Modern, intuitive user interface with animated transitions
- **Error Handling**: Comprehensive error messaging and recovery options
- **Transaction History**: View past bridge transactions and their status
- **Dark/Light Mode**: Support for different visual preferences

## Technical Architecture

### Frontend Stack
- **Framework**: React 19 with TypeScript for type safety
- **Build Tool**: Vite 6 for fast development and optimized builds
- **Styling**: TailwindCSS 4.0 for utility-first styling
- **Routing**: React Router DOM 7 for navigation
- **State Management**: React Hooks and Context API
- **UI Components**: Custom components with Lucide React icons

### Bridge Mechanism
The bridge operates using a lock-and-mint mechanism:
1. Tokens are locked in a smart contract on the source chain
2. Corresponding tokens are minted on the destination chain
3. The process is verified through cross-chain message passing
4. Security is maintained through multi-signature validation

### Network Integration
- Support for EVM-compatible networks
- Web3 wallet integration
- Real-time blockchain event listeners
- Chain-specific adapters for consistent API

## Project Structure
```
src/
├── assets/          # Static assets and icons
│   └── icons/       # Network-specific icons
├── components/      # Reusable UI components
│   └── Canvas/      # Particle effect background
├── pages/           # Main application pages
│   └── bridge.tsx   # Bridge interface implementation
├── hooks/           # Custom React hooks
├── utils/           # Utility functions and helpers
├── constants/       # Application constants
├── types/           # TypeScript type definitions
├── services/        # API and blockchain service integrations
└── router.tsx       # Application routing configuration
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or bun package manager
- A Web3 wallet (MetaMask recommended)
- Test tokens on supported networks

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/block-mentor-platform-web.git
cd block-mentor-platform-web
```

2. Install dependencies:
```bash
npm install
# or using yarn
yarn install
# or using bun
bun install
```

3. Start the development server:
```bash
npm run dev
# or using yarn
yarn dev
# or using bun
bun run dev
```

### Configuration
The application requires the following environment variables:
- Network RPC endpoints
- Bridge contract addresses
- API endpoints (if applicable)

Create a `.env` file in the root directory with the following variables:
```
VITE_ARBITRUM_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
VITE_BASE_RPC_URL=https://sepolia.base.org
VITE_BRIDGE_CONTRACT_ARBITRUM=0x...
VITE_BRIDGE_CONTRACT_BASE=0x...
```

## Development

### Available Scripts
- `npm run dev` / `yarn dev` / `bun run dev` - Start development server
- `npm run build` / `yarn build` / `bun run build` - Create production build
- `npm run lint` / `yarn lint` / `bun run lint` - Run ESLint checks
- `npm run preview` / `yarn preview` / `bun run preview` - Preview production build locally

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

### Testing
- Component tests using React Testing Library
- Contract integration tests
- E2E tests with Cypress

## Deployment
The application can be deployed to various hosting platforms:

### Static Hosting (Recommended)
1. Build the project: `npm run build` / `yarn build` / `bun run build`
2. Deploy the `dist` directory to:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

### Self-Hosted
1. Build the project: `npm run build` / `yarn build` / `bun run build`
2. Serve the `dist` directory using a web server like Nginx or Apache

## Usage Guide

1. **Connect Wallet**
   - Ensure your Web3 wallet is connected
   - Switch to a supported network

2. **Select Networks**
   - Choose source network (from)
   - Choose destination network (to)
   - Use the swap button to quickly switch between networks

3. **Enter Amount**
   - Specify the amount of tokens to bridge
   - System will validate against available balance
   - Fee estimation will be displayed

4. **Confirm Transaction**
   - Review transaction details
   - Confirm in your Web3 wallet
   - Wait for confirmation and completion

## Security Considerations

- All transactions require wallet signature
- Real-time balance validation
- Network state validation before transactions
- Error handling for failed transactions
- Smart contract audits
- Rate limiting to prevent attack vectors
- Gas fee optimization

## Troubleshooting

### Common Issues
- **Transaction Pending**: Bridge transactions typically take 3-15 minutes to complete depending on network congestion
- **Network Switching Failed**: Ensure your wallet supports the destination network
- **Insufficient Funds**: Make sure you have enough tokens to cover both the bridge amount and gas fees
- **Transaction Rejected**: Check that you have approved the necessary token allowance

### Support
For technical support:
- Open an issue on GitHub
- Join our community Discord server
- Email support@blockmentorplatform.com

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a new Pull Request

### Development Guidelines
- Follow the project's code style
- Write tests for new features
- Update documentation as needed
- Reference issues in commit messages

## License

This project is licensed under the terms included in the LICENSE file.

## Acknowledgements

- [Arbitrum](https://arbitrum.io/)
- [Base](https://base.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
