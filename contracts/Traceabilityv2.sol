// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Traceabilityv2 {
    struct ProductHistoryItem {
        bytes32 name;
        bytes32 action;
        string details;
        string location;
        uint256 timestamp;
    }

    mapping(bytes32 => ProductHistoryItem[]) public productHistories;
    mapping(bytes32 => string) public productCodes;

    event ProductInitialized(bytes32 indexed productCode, string name);
    event ProductProcessed(bytes32 indexed productCode, string facilityDetails);
    event ProductManufactured(bytes32 indexed productCode, string unitDetails);
    event ProductDistributed(bytes32 indexed productCode, string locationDetails);

    function initializeProduct(
        string memory name,
        string memory ingredientData,
        string memory producerDetails,
        uint256 productionDate
    ) public returns (bytes32) {
        bytes32 productCode = generateProductCode(name, ingredientData, producerDetails, productionDate);
        productCodes[productCode] = name;
        productHistories[productCode].push(ProductHistoryItem(bytes32(abi.encodePacked(name)), "Product Initialized", ingredientData, producerDetails, block.timestamp));
        emit ProductInitialized(productCode, name);
        return productCode;
    }

    function recordProcessing(
        bytes32 productCode,
        string memory facilityDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        productHistories[productCode].push(ProductHistoryItem(productHistories[productCode][0].name, "Processing Recorded", "", facilityDetails, block.timestamp));
        emit ProductProcessed(productCode, facilityDetails);
    }

    function recordManufacturing(
        bytes32 productCode,
        string memory unitDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        productHistories[productCode].push(ProductHistoryItem(productHistories[productCode][0].name, "Manufacturing Recorded", "", unitDetails, block.timestamp));
        emit ProductManufactured(productCode, unitDetails);
    }

    function recordDistributionAndRetail(
        bytes32 productCode,
        string memory locationDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        productHistories[productCode].push(ProductHistoryItem(productHistories[productCode][0].name, "Distribution/Retail Recorded", "", locationDetails, block.timestamp));
        emit ProductDistributed(productCode, locationDetails);
    }

    function verifyProduct(bytes32 productCode) public view returns (ProductHistoryItem[] memory) {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        return productHistories[productCode];
    }

    function generateProductCode(
        string memory name,
        string memory ingredientData,
        string memory producerDetails,
        uint256 productionDate
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(name, ingredientData, producerDetails, productionDate));
    }
}