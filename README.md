# Block Mentor Platform - Bridge Application

A specialized cross-chain bridge application that enables seamless token transfers between different blockchain networks.

## Overview

Block Mentor Platform Bridge is a dedicated web application designed to facilitate cross-chain token transfers with a focus on security, usability, and real-time transaction tracking. It currently supports bridging between Arbitrum Sepolia and Base Sepolia networks.

## Features

### Core Functionality
- **Cross-chain Token Bridging**: Transfer tokens between supported networks
- **Network Support**: 
  - Arbitrum Sepolia
  - Base Sepolia
- **Real-time Balance Updates**: Live tracking of wallet balances across networks
- **Transaction Status Tracking**: Monitor bridge transaction status in real-time
- **Interactive Network Selection**: Easy-to-use network switching interface

### User Experience
- **Responsive Design**: Fully responsive interface that works on all devices
- **Interactive UI Components**: Modern, intuitive user interface
- **Error Handling**: Comprehensive error messaging and recovery options
- **Transaction History**: View past bridge transactions and their status

## Technical Architecture

### Frontend Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS
- **Routing**: React Router DOM 7
- **State Management**: React Hooks and Context

### Network Integration
- Support for EVM-compatible networks
- Web3 wallet integration
- Real-time blockchain event listeners

## Project Structure
```
src/
├── assets/          # Static assets and icons
│   └── icons/       # Network-specific icons
├── components/      # Reusable UI components
│   └── Canvas/     # Particle effect background
├── pages/          # Main application pages
│   └── bridge.tsx  # Bridge interface implementation
└── router.tsx      # Application routing configuration
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- A Web3 wallet (MetaMask recommended)

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd block-mentor-platfrom-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Configuration
The application requires the following environment variables:
- Network RPC endpoints
- Bridge contract addresses
- API endpoints (if applicable)

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

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

4. **Confirm Transaction**
   - Review transaction details
   - Confirm in your Web3 wallet
   - Wait for confirmation and completion

## Security Considerations

- All transactions require wallet signature
- Real-time balance validation
- Network state validation before transactions
- Error handling for failed transactions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the terms included in the LICENSE file.
