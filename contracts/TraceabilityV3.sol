// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TraceabilityV3 {
    struct ProductHistoryItem {
        bytes32 name;
        string stage;
        string additional_details;
        string performer_details;
        uint256 timestamp;
    }

    mapping(bytes32 => ProductHistoryItem[]) public productHistory;
    mapping(bytes32 => string) public productCodes;

    // New event declaration
    event ProductInitialized(bytes32 indexed productCode, string name);

    function initializeProduct(
        string memory name,
        string memory ingredientData,
        string memory producerDetails
    ) public returns (bytes32) {
        bytes32 productCode = generateProductCode(name, ingredientData, producerDetails, block.timestamp);
        productCodes[productCode] = name;
        productHistory[productCode].push(ProductHistoryItem(bytes32(abi.encodePacked(name)), "Ingredients are collected", ingredientData, producerDetails, block.timestamp));

        // Emit the new event
        emit ProductInitialized(productCode, name);

        return productCode;
    }

    function recordManufacturing(
        bytes32 productCode,
        string memory unitDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        productHistory[productCode].push(ProductHistoryItem(productHistory[productCode][0].name, "Manufacturing has started", "", unitDetails, block.timestamp));
    }

    function recordDistributor(
        bytes32 productCode,
        string memory unitDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        productHistory[productCode].push(ProductHistoryItem(productHistory[productCode][0].name, "Product received by Distributor", "", unitDetails, block.timestamp));
    }

    function recordRetailer(
        bytes32 productCode,
        string memory unitDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        productHistory[productCode].push(ProductHistoryItem(productHistory[productCode][0].name, "Product received by Retailer", "", unitDetails, block.timestamp));
    }

    function verifyProduct(bytes32 productCode) public view returns (ProductHistoryItem[] memory) {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        return productHistory[productCode];
    }

    function generateProductCode(
        string memory name,
        string memory ingredientData,
        string memory producerDetails,
        uint timestamp
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(name, ingredientData, producerDetails, timestamp));
    }
}
