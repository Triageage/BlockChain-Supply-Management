import { ethers } from 'ethers';

const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "productCode",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "locationDetails",
          "type": "string"
        }
      ],
      "name": "ProductDistributed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "productCode",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "ProductInitialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "productCode",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "unitDetails",
          "type": "string"
        }
      ],
      "name": "ProductManufactured",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "productCode",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "facilityDetails",
          "type": "string"
        }
      ],
      "name": "ProductProcessed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ingredientData",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "producerDetails",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "productionDate",
          "type": "uint256"
        }
      ],
      "name": "generateProductCode",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ingredientData",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "producerDetails",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "productionDate",
          "type": "uint256"
        }
      ],
      "name": "initializeProduct",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "productCodes",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "productHistories",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "name",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "action",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "details",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "productCode",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "locationDetails",
          "type": "string"
        }
      ],
      "name": "recordDistributionAndRetail",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "productCode",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "unitDetails",
          "type": "string"
        }
      ],
      "name": "recordManufacturing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "productCode",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "facilityDetails",
          "type": "string"
        }
      ],
      "name": "recordProcessing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "productCode",
          "type": "bytes32"
        }
      ],
      "name": "verifyProduct",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "name",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "action",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "details",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct Traceabilityv2.ProductHistoryItem[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const contractAddress = process.env.EMITTER_ADDRESS;

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.POLYGON_AMOY_RPC_URL);
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, wallet);
  
    const name = "Great Beginning";
    const ingredientData = "Water, Salt, Milk";
    const producerDetails = "My Farm";
    const productionDate = Math.floor(Date.now() / 1000);
  
    try {
      console.log("Generating product code locally...");
      const localProductCode = await contract.generateProductCode(name, ingredientData, producerDetails, productionDate);
      console.log("Local Product Code:", localProductCode);
  
      console.log("Initializing product...");
      const tx = await contract.initializeProduct(name, ingredientData, producerDetails, productionDate);
      
      console.log("Waiting for transaction to be mined...");
      const receipt = await tx.wait();
      
      console.log("Transaction hash:", receipt.hash);
  
      // Extract product code from the event
      const event = receipt.logs.find(log => log.topics[0] === ethers.id("ProductInitialized(bytes32,string)"));
      const productCode = event.topics[1];
      console.log("Product Code from event:", productCode);
  
      console.log("Waiting for 10 seconds before verifying...");
      await new Promise(resolve => setTimeout(resolve, 10000));

      const facilityDetails = "My Facility";

      await contract.recordProcessing(productCode,facilityDetails
    )
  
      console.log("Verifying product...");
      try {
        const productHistory = await contract.verifyProduct(productCode);
        console.log("Product history:");
        productHistory.forEach((item, index) => {
          console.log(`History Item ${index + 1}:`);
          console.log(`  Name: ${ethers.decodeBytes32String(item.name)}`);
          console.log(`  Action: ${ethers.decodeBytes32String(item.action)}`);
          console.log(`  Details: ${(item.details)}`);
          console.log(`  Location: ${(item.location)}`);
          console.log(`  Timestamp: ${new Date(Number(item.timestamp) * 1000)}`);
        });
      } catch (verifyError) {
        console.error("Error during verification:", verifyError.message);
      }
  
    } catch (error) {
      console.error("An error occurred:", error);
    }
}

main();