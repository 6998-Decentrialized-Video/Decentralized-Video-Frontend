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

Create a `.env` file in the root directory to store environment variables.
```bash
touch .env
```
Open the `.env` file with your preferred text editor and add the following variables:

```ini
REACT_APP_BACKEND_URL=http://localhost:8000/  #or wherever your backend server was deployed
REACT_APP_IPFS_URL=http://localhost:5001/     #or wherever your IPFS for the backend server was deployed
REACT_APP_IPFS_GATEWAY=http://localhost:8080/ #or wherever your IPFS for the backend server was deployed
REACT_APP_FRONTEND_URL=http://localhost:3000/ #or whatever frontend URL you desire
```

## Running the Application

### Start the Node.js application
```bash
npm start
```

You should be able to access the application at `http://localhost:3000/`, or whatever frontend URL you chose.

Once you have the UI open, you may interact with the backend server using any one of the accessible pages on the UI, including but not limited to: uploading videos, viewing videos, logging in/signing out, checking your profile, liking/commenting on videos.

Enjoy!