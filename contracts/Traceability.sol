// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Traceability {
    struct ProductHistoryItem {
        bytes32 name;
        bytes32 action;
        bytes32 details;
        uint256 timestamp;
    }

    mapping(bytes32 => ProductHistoryItem[]) public productHistories;
    mapping(bytes32 => string) private productCodes;

    function initializeProduct(
        string memory name,
        string memory ingredientData,
        string memory producerDetails,
        uint256 productionDate
    ) public returns (bytes32) {
        bytes32 productCode = _generateProductCode(name, ingredientData, producerDetails, productionDate);
        productCodes[productCode] = ingredientData;
        productHistories[productCode].push(ProductHistoryItem(bytes32(abi.encodePacked(name)), "Product Initialized", "", block.timestamp));
        return productCode;
    }

    function recordProcessing(
        bytes32 productCode,
        bytes32 facilityDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        productHistories[productCode].push(ProductHistoryItem(productHistories[productCode][0].name, "Processing Recorded", facilityDetails, block.timestamp));
    }

    function recordManufacturing(
        bytes32 productCode,
        bytes32 unitDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        productHistories[productCode].push(ProductHistoryItem(productHistories[productCode][0].name, "Manufacturing Recorded", unitDetails, block.timestamp));
    }

    function recordDistributionAndRetail(
        bytes32 productCode,
        bytes32 locationDetails
    ) public {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        productHistories[productCode].push(ProductHistoryItem(productHistories[productCode][0].name, "Distribution/Retail Recorded", locationDetails, block.timestamp));
    }

    function verifyProduct(bytes32 productCode) public view returns (ProductHistoryItem[] memory) {
        require(bytes(productCodes[productCode]).length > 0, "Product does not exist");
        return productHistories[productCode];
    }

    function _generateProductCode(
        string memory name,
        string memory ingredientData,
        string memory producerDetails,
        uint256 productionDate
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(name, ingredientData, producerDetails, productionDate));
    }
}