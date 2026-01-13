#  Intent Based Fund Flow using Blockchain

## Description
This is a blockchain-based, intent-driven fund management system designed to improve transparency, accountability, and efficiency in government fund allocation and disbursement.

In traditional government budgeting systems, funds allocated for a specific purpose can be misused after transfer due to a lack of enforceable intent. We solve this problem with the *intent* of funds on-chain and enforcing hierarchical validation across multiple government levels — from central authority to schemes and finally beneficiaries.

The platform is built for government authorities, scheme administrators, auditors, and beneficiaries to ensure that public funds are used **only for their approved purposes**, with full traceability and auditability.

---

## Demo Video Link:

---

## Features
- **Intent-Based Fund Allocation** – Funds are issued with a locked purpose that cannot be violated
- **Hierarchical Approval Flow** – Central authority approves and allocates funds to schemes, which further distribute to beneficiaries
- **Blockchain Transparency & Auditability** – All fund movements are recorded immutably on chain
- **Role-Based Dashboards** – Separate dashboards for Central Authority, Schemes, and Beneficiaries
- **Wallet Integration** – MetaMask based authentication and transactions
- **Tamper-Proof Fund Usage** – Funds cannot be spent outside their approved intent

---

## Tech Stack

### Blockchain & Backend
- **Solidity** – Smart contract development
- **Hardhat** – Development, testing, and deployment environment
- **Polygon Network** – Scalable, low-cost blockchain for transactions
- **ERC-20 Standard** – Token-based fund representation with intent metadata
- **MetaMask** – Wallet integration and transaction signing

### Frontend
- **React (JSX)** – User interface development
- **CSS** – UI styling

### Database & Services
- **Firebase** – Authentication and off-chain data storage

---

## Google Technologies Used
- **Firebase Authentication** – Used for secure user login and role-based access control (Central Authority, Scheme Admin, Beneficiary)

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MetaMask browser extension
- Hardhat
- Polygon testnet configured in MetaMask

### Steps to Run Locally
1. Clone the repository  
   ```bash
   git clone <repository-url>
   cd <project-folder>

2. Install dependencies  
   ```bash
   npm install

3. Add environment variables  
   Create a `.env` file in the root directory and add:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

4. Start the frontend  
   ```bash
   npm run dev

5. (Optional) Run blockchain locally  

   Start a local Hardhat node:
   ```bash
   npx hardhat node

Deploy smart contracts:
```bash
npx hardhat run scripts/deploy.js --network localhost

---

## Team Members
-Janice Carmel D'souza
-Jeswin Gerald D'souza
-Nikhitha Risha D'souza
-Johan Colaco

---








  
