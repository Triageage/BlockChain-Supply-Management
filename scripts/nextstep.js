//import { ethers } from 'ethers';
const { ethers } = require("ethers");
const dotenv = require("dotenv").config();

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

const contractAddress = "0xD95101Cf7D318569CcF33bdB9a31B9f17158d6C9";

async function main() {

    const provider = new ethers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/Ck7tp87zv3MjYjgGH324NNVUvSxgZHG4");
    const privateKey = "8f401dd5d084e33806c0f7b12022a776970af33423657092473663e3e43f617c";
    console.log("here", privateKey);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    const productCode = "0x64879f931fda039b84eb91d7bc9e4dfe93d11caee6abaefa74cb8a868b072152"
    //const facilityDetails = "J and J Processing Center, 123 Main St, Anytown, USA, 12345"

    //const tx = await contract.recordProcessing(productCode, facilityDetails);
    //await tx.wait();
    //console.log("Recorded Processing");
    //console.log("Transaction hash:", tx.hash);

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

}

main();
