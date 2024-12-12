# BTube - A Decentralized Video Platform （UI）

This project is the frontend implementation for our decentralized video platform. It interacts with our designated backend server to act as the user interface. The frontend is built using a Javascript React framework.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js and NPM
- All requirements from BTube's backend (as the backend is necessary to operate the frontend)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Decentralized-Video-Frontend.git
cd Decentralized-Video-Frontend
```

### 2. Install Node.js Dependencies
Install Node.js dependencies associated with the app.
```bash
npm install
```

## Environment Setup

Create a `.env` file in the `/backend` directory to store environment variables.
```bash
touch .env
```
Open the `.env` file with your preferred text editor and add the following variables:

```ini
# Web3 Configuration
WEB3_PROVIDER_URI=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
CONTRACT_ADDRESS=YourContractAddress
PRIVATE_KEY=YourPrivateKey

# Coinbase OAuth Configuration
COINBASE_CLIENT_ID=YourCoinbaseClientID
COINBASE_CLIENT_SECRET=YourCoinbaseClientSecret
COINBASE_REDIRECT_URI=http://localhost:8000/auth/callback

# Flask Configuration
FLASK_SECRET_KEY=YourFlaskSecretKey

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@yourcluster.mongodb.net/?retryWrites=true&w=majority
```