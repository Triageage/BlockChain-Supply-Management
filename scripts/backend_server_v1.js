require("dotenv").config();
const { ethers } = require("ethers");
const express = require("express");
const cors = require("cors");

const abi = [
   {
      anonymous: false,
      inputs: [
         {
            indexed: true,
            internalType: "bytes32",
            name: "productCode",
            type: "bytes32",
         },
         {
            indexed: false,
            internalType: "string",
            name: "name",
            type: "string",
         },
      ],
      name: "ProductInitialized",
      type: "event",
   },
   {
      inputs: [
         {
            internalType: "string",
            name: "name",
            type: "string",
         },
         {
            internalType: "string",
            name: "ingredientData",
            type: "string",
         },
         {
            internalType: "string",
            name: "producerDetails",
            type: "string",
         },
         {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
         },
      ],
      name: "generateProductCode",
      outputs: [
         {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
         },
      ],
      stateMutability: "pure",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "string",
            name: "name",
            type: "string",
         },
         {
            internalType: "string",
            name: "ingredientData",
            type: "string",
         },
         {
            internalType: "string",
            name: "producerDetails",
            type: "string",
         },
      ],
      name: "initializeProduct",
      outputs: [
         {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
         },
      ],
      stateMutability: "nonpayable",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
         },
      ],
      name: "productCodes",
      outputs: [
         {
            internalType: "string",
            name: "",
            type: "string",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
         },
         {
            internalType: "uint256",
            name: "",
            type: "uint256",
         },
      ],
      name: "productHistory",
      outputs: [
         {
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
         },
         {
            internalType: "string",
            name: "stage",
            type: "string",
         },
         {
            internalType: "string",
            name: "additional_details",
            type: "string",
         },
         {
            internalType: "string",
            name: "performer_details",
            type: "string",
         },
         {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "bytes32",
            name: "productCode",
            type: "bytes32",
         },
         {
            internalType: "string",
            name: "unitDetails",
            type: "string",
         },
      ],
      name: "recordDistributor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "bytes32",
            name: "productCode",
            type: "bytes32",
         },
         {
            internalType: "string",
            name: "unitDetails",
            type: "string",
         },
      ],
      name: "recordManufacturing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "bytes32",
            name: "productCode",
            type: "bytes32",
         },
         {
            internalType: "string",
            name: "unitDetails",
            type: "string",
         },
      ],
      name: "recordRetailer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "bytes32",
            name: "productCode",
            type: "bytes32",
         },
      ],
      name: "verifyProduct",
      outputs: [
         {
            components: [
               {
                  internalType: "bytes32",
                  name: "name",
                  type: "bytes32",
               },
               {
                  internalType: "string",
                  name: "stage",
                  type: "string",
               },
               {
                  internalType: "string",
                  name: "additional_details",
                  type: "string",
               },
               {
                  internalType: "string",
                  name: "performer_details",
                  type: "string",
               },
               {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
               },
               {
                  internalType: "uint256",
                  name: "expiry_date",
                  type: "uint256",
               },
            ],
            internalType: "struct TraceabilityV5.ProductHistoryItem[]",
            name: "",
            type: "tuple[]",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
];

const contractAddress = process.env.FINAL_CONTRACT_1;

console.log(contractAddress);

// Initialize Express
const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Provider and Wallet initialization
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_AMOY_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Route to fetch product details
app.get("/api/product/:productCode", async (req, res) => {
   const productCode = req.params.productCode;

   console.log(`Verifying product with code: ${productCode}`);

   try {
      const productHistory = await contract.verifyProduct(productCode);

      const historyItems = productHistory.map((item, index) => ({
         index: index + 1,
         name: ethers.decodeBytes32String(item.name),
         stage: item.stage,
         additional_details: item.additional_details,
         performer_details: item.performer_details,
         timestamp: new Date(Number(item.timestamp) * 1000),
      }));

      res.status(200).json({
         message: "Product history fetched successfully",
         productHistory: historyItems,
      });
   } catch (verifyError) {
      console.error("Error during verification:", verifyError.message);
      res.status(404).json({
         error: "Failed to verify product. Please check the product code and try again.",
         details: verifyError.message,
      });
   }
});

app.post("/api/create", async (req, res) => {
   const name = req.body.name;
   const ingredientData = req.body.ingredientData;
   const producerDetails = req.body.producerDetails;

   console.log(name, ingredientData, producerDetails);

   try {
      const tx = await contract.initializeProduct(
         name,
         ingredientData,
         producerDetails
      );
      const receipt = await tx.wait();

      // Find the ProductInitialized event in the logs
      const event = receipt.logs.find(
         (log) => log.eventName === "ProductInitialized"
      );

      if (event) {
         const productCode = event.args.productCode;
         console.log("Product code:", productCode);
         res.status(200).json({
            message: "Product created successfully",
            productCode: productCode,
         });
      } else {
         throw new Error(
            "ProductInitialized event not found in transaction logs"
         );
      }
   } catch (error) {
      console.error("Error during product creation:", error.message);
      res.status(500).json({
         error: "Failed to create product. Please try again.",
         details: error.message,
      });
   }

   // res.status(200).json({
   //    message: "Product created successfully",
   //    productCode:
   //       "0x123456789012345678aasdfasdfasdfasdfasdfdsaffassdfasdfasdfasdfasdfafsd9012345678901234567890",
   // });
});

app.post("/api/update", async (req, res) => {
   const productCode = req.body.productCode;
   const facilityDetails = req.body.facilityDetails;
   const producerDetails = req.body.producerDetails;

   //console.log(productCode, facilityDetails, producerDetails);
   let tx;

   try {
      if (producerDetails == "Manufacturer") {
         console.log("Manufacturer");
         tx = await contract.recordManufacturing(productCode, facilityDetails);
      } else if (producerDetails == "Distributor") {
         console.log("Distributor");
         tx = await contract.recordDistributor(productCode, facilityDetails);
      } else if (producerDetails == "Retailer") {
         console.log("Retailer");
         tx = await contract.recordRetailer(productCode, facilityDetails);
      } else {
         console.log("Invalid producer details");
         res.status(400).json({
            error: "Invalid producer details. Please try again.",
         });
      }

      const receipt = await tx.wait();
      res.status(200).json({ message: "Product updated successfully" });
   } catch (error) {
      console.error("Error during product update:", error.message);
      res.status(500).json({
         error: "Failed to update product. Please try again.",
      });
   }
});

// Start the server
app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});
