import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "0x8059B0AE35c113137694Ba15b2C3585aE77Bb8E9"; //replace this with contract address after deployment

export const CONTRACT_ABI = [

    // replace the below with your contract's ABI in remix
 
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "requestId",
	// 			"type": "uint256"
	// 		}
	// 	],
	// 	"name": "approveSpend",
	// 	"outputs": [],
	// 	"stateMutability": "nonpayable",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "address",
	// 			"name": "user",
	// 			"type": "address"
	// 		},
	// 		{
	// 			"internalType": "enum IntentBasedFundControl.Role",
	// 			"name": "role",
	// 			"type": "uint8"
	// 		}
	// 	],
	// 	"name": "assignRole",
	// 	"outputs": [],
	// 	"stateMutability": "nonpayable",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "parentId",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "string",
	// 			"name": "purpose",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "maxAmount",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "validUntil",
	// 			"type": "uint256"
	// 		}
	// 	],
	// 	"name": "createIntent",
	// 	"outputs": [],
	// 	"stateMutability": "nonpayable",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "intentId",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "string",
	// 			"name": "description",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "amount",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "address",
	// 			"name": "vendor",
	// 			"type": "address"
	// 		}
	// 	],
	// 	"name": "requestSpend",
	// 	"outputs": [],
	// 	"stateMutability": "nonpayable",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "address",
	// 			"name": "_centralGov",
	// 			"type": "address"
	// 		}
	// 	],
	// 	"stateMutability": "nonpayable",
	// 	"type": "constructor"
	// },
	// {
	// 	"anonymous": false,
	// 	"inputs": [
	// 		{
	// 			"indexed": false,
	// 			"internalType": "uint256",
	// 			"name": "intentId",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"indexed": false,
	// 			"internalType": "uint256",
	// 			"name": "parentId",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"indexed": false,
	// 			"internalType": "string",
	// 			"name": "purpose",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"indexed": false,
	// 			"internalType": "uint256",
	// 			"name": "maxAmount",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"indexed": false,
	// 			"internalType": "address",
	// 			"name": "owner",
	// 			"type": "address"
	// 		}
	// 	],
	// 	"name": "IntentCreated",
	// 	"type": "event"
	// },
	// {
	// 	"anonymous": false,
	// 	"inputs": [
	// 		{
	// 			"indexed": false,
	// 			"internalType": "uint256",
	// 			"name": "requestId",
	// 			"type": "uint256"
	// 		}
	// 	],
	// 	"name": "SpendApproved",
	// 	"type": "event"
	// },
	// {
	// 	"anonymous": false,
	// 	"inputs": [
	// 		{
	// 			"indexed": false,
	// 			"internalType": "uint256",
	// 			"name": "requestId",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"indexed": false,
	// 			"internalType": "uint256",
	// 			"name": "intentId",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"indexed": false,
	// 			"internalType": "address",
	// 			"name": "requester",
	// 			"type": "address"
	// 		},
	// 		{
	// 			"indexed": false,
	// 			"internalType": "uint256",
	// 			"name": "amount",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"indexed": false,
	// 			"internalType": "address",
	// 			"name": "vendor",
	// 			"type": "address"
	// 		}
	// 	],
	// 	"name": "SpendRequested",
	// 	"type": "event"
	// },
	// {
	// 	"inputs": [],
	// 	"name": "centralAuthority",
	// 	"outputs": [
	// 		{
	// 			"internalType": "address",
	// 			"name": "",
	// 			"type": "address"
	// 		}
	// 	],
	// 	"stateMutability": "view",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "intentId",
	// 			"type": "uint256"
	// 		}
	// 	],
	// 	"name": "getIntent",
	// 	"outputs": [
	// 		{
	// 			"components": [
	// 				{
	// 					"internalType": "uint256",
	// 					"name": "id",
	// 					"type": "uint256"
	// 				},
	// 				{
	// 					"internalType": "uint256",
	// 					"name": "parentId",
	// 					"type": "uint256"
	// 				},
	// 				{
	// 					"internalType": "string",
	// 					"name": "purpose",
	// 					"type": "string"
	// 				},
	// 				{
	// 					"internalType": "uint256",
	// 					"name": "maxAmount",
	// 					"type": "uint256"
	// 				},
	// 				{
	// 					"internalType": "uint256",
	// 					"name": "usedAmount",
	// 					"type": "uint256"
	// 				},
	// 				{
	// 					"internalType": "uint256",
	// 					"name": "validUntil",
	// 					"type": "uint256"
	// 				},
	// 				{
	// 					"internalType": "address",
	// 					"name": "owner",
	// 					"type": "address"
	// 				},
	// 				{
	// 					"internalType": "bool",
	// 					"name": "exists",
	// 					"type": "bool"
	// 				}
	// 			],
	// 			"internalType": "struct IntentBasedFundControl.Intent",
	// 			"name": "",
	// 			"type": "tuple"
	// 		}
	// 	],
	// 	"stateMutability": "view",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "requestId",
	// 			"type": "uint256"
	// 		}
	// 	],
	// 	"name": "getSpendRequest",
	// 	"outputs": [
	// 		{
	// 			"components": [
	// 				{
	// 					"internalType": "uint256",
	// 					"name": "id",
	// 					"type": "uint256"
	// 				},
	// 				{
	// 					"internalType": "uint256",
	// 					"name": "intentId",
	// 					"type": "uint256"
	// 				},
	// 				{
	// 					"internalType": "address",
	// 					"name": "requester",
	// 					"type": "address"
	// 				},
	// 				{
	// 					"internalType": "address",
	// 					"name": "vendor",
	// 					"type": "address"
	// 				},
	// 				{
	// 					"internalType": "string",
	// 					"name": "description",
	// 					"type": "string"
	// 				},
	// 				{
	// 					"internalType": "uint256",
	// 					"name": "amount",
	// 					"type": "uint256"
	// 				},
	// 				{
	// 					"internalType": "bool",
	// 					"name": "approved",
	// 					"type": "bool"
	// 				},
	// 				{
	// 					"internalType": "bool",
	// 					"name": "executed",
	// 					"type": "bool"
	// 				}
	// 			],
	// 			"internalType": "struct IntentBasedFundControl.SpendRequest",
	// 			"name": "",
	// 			"type": "tuple"
	// 		}
	// 	],
	// 	"stateMutability": "view",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [],
	// 	"name": "intentCounter",
	// 	"outputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "",
	// 			"type": "uint256"
	// 		}
	// 	],
	// 	"stateMutability": "view",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "",
	// 			"type": "uint256"
	// 		}
	// 	],
	// 	"name": "intents",
	// 	"outputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "id",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "parentId",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "string",
	// 			"name": "purpose",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "maxAmount",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "usedAmount",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "validUntil",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "address",
	// 			"name": "owner",
	// 			"type": "address"
	// 		},
	// 		{
	// 			"internalType": "bool",
	// 			"name": "exists",
	// 			"type": "bool"
	// 		}
	// 	],
	// 	"stateMutability": "view",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [],
	// 	"name": "requestCounter",
	// 	"outputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "",
	// 			"type": "uint256"
	// 		}
	// 	],
	// 	"stateMutability": "view",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "address",
	// 			"name": "",
	// 			"type": "address"
	// 		}
	// 	],
	// 	"name": "roles",
	// 	"outputs": [
	// 		{
	// 			"internalType": "enum IntentBasedFundControl.Role",
	// 			"name": "",
	// 			"type": "uint8"
	// 		}
	// 	],
	// 	"stateMutability": "view",
	// 	"type": "function"
	// },
	// {
	// 	"inputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "",
	// 			"type": "uint256"
	// 		}
	// 	],
	// 	"name": "spendRequests",
	// 	"outputs": [
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "id",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "intentId",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "address",
	// 			"name": "requester",
	// 			"type": "address"
	// 		},
	// 		{
	// 			"internalType": "address",
	// 			"name": "vendor",
	// 			"type": "address"
	// 		},
	// 		{
	// 			"internalType": "string",
	// 			"name": "description",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"internalType": "uint256",
	// 			"name": "amount",
	// 			"type": "uint256"
	// 		},
	// 		{
	// 			"internalType": "bool",
	// 			"name": "approved",
	// 			"type": "bool"
	// 		},
	// 		{
	// 			"internalType": "bool",
	// 			"name": "executed",
	// 			"type": "bool"
	// 		}
	// 	],
	// 	"stateMutability": "view",
	// 	"type": "function"
	// }

];

export async function getContract() {
  if (!window.ethereum) {
    alert("MetaMask required");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}
