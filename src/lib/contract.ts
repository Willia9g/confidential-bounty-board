// Contract ABI for ConfidentialBountyBoard
export const ConfidentialBountyBoardABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_verifier",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "applicationId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "applicant",
        "type": "address"
      }
    ],
    "name": "ApplicationAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "applicationId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "applicant",
        "type": "address"
      }
    ],
    "name": "ApplicationSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "BountyCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "bountyId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      }
    ],
    "name": "BountyCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "reputation",
        "type": "uint32"
      }
    ],
    "name": "ReputationUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "submissionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "applicationId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "submitter",
        "type": "address"
      }
    ],
    "name": "SubmissionSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "submissionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      }
    ],
    "name": "SubmissionVerified",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_applicationId",
        "type": "uint256"
      }
    ],
    "name": "acceptApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bountyId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_proposal",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_proposedAmount",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_estimatedTime",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "createBounty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_skills",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_initialReputation",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "createUserProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bountyId",
        "type": "uint256"
      }
    ],
    "name": "getBountyInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "requirements",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "rewardAmount",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "difficulty",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "maxApplicants",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "currentApplicants",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCompleted",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserReputation",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_bountyId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_proposal",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_proposedAmount",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_estimatedTime",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "submitApplication",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_applicationId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_submissionHash",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_qualityScore",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "inputProof",
        "type": "bytes"
      }
    ],
    "name": "submitWork",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_reputation",
        "type": "bytes"
      }
    ],
    "name": "updateUserReputation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_submissionId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_isVerified",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "_feedback",
        "type": "string"
      }
    ],
    "name": "verifySubmission",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifier",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const
