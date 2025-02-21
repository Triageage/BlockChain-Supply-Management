// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Traceabilitytest {
    struct ProductHistoryItem {
        bytes32 name;
        string stage;
        string additional_details;
        string performer_details;
        uint256 timestamp;
    }

    mapping(bytes32 => ProductHistoryItem[]) public productHistory;
    mapping(bytes32 => string) public productCodes;

    event ProductInitialized(bytes32 indexed productCode, string name);
    event DebugLog(bytes32 productCode, string message);

    function initializeProduct(
        string memory name,
        string memory ingredientData,
        string memory producerDetails
    ) public returns (bytes32) {
        bytes32 productCode = generateProductCode(name, ingredientData, producerDetails, block.timestamp);
        productCodes[productCode] = name;
        productHistory[productCode].push(ProductHistoryItem(bytes32(abi.encodePacked(name)), "Ingredients are collected", ingredientData, producerDetails, block.timestamp));

        emit DebugLog(productCode, "Product code generated");
        emit ProductInitialized(productCode, name);
        emit DebugLog(productCode, "ProductInitialized event emitted");

        return productCode;
    }


    function recordManufacturing(
        bytes32 productCode,
        string memory unitDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        require(productHistory[productCode].length == 1, "Manufacturing has already been recorded");

        productHistory[productCode].push(ProductHistoryItem(productHistory[productCode][0].name, "Manufacturing has started", "", unitDetails, block.timestamp));
    }

    function recordDistributor(
        bytes32 productCode,
        string memory unitDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        require(productHistory[productCode].length == 2, "Incorrect stage for distributor recording");

        productHistory[productCode].push(ProductHistoryItem(productHistory[productCode][0].name, "Product received by Distributor", "", unitDetails, block.timestamp));
    }

    function recordRetailer(
        bytes32 productCode,
        string memory unitDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        require(productHistory[productCode].length == 3, "Incorrect stage for retailer recording");

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
