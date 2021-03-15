pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "./ExchangeDomainV1.sol";
import "./OwnableOperatorRole.sol";

contract ExchangeStateV1 is OwnableOperatorRole {
    // keccak256(OrderKey) => completed
    mapping(bytes32 => uint256) public completed;

    function getCompleted(ExchangeDomainV1.OrderKey calldata key)
        external
        view
        returns (uint256)
    {
        return completed[getCompletedKey(key)];
    }

    function setCompleted(
        ExchangeDomainV1.OrderKey calldata key,
        uint256 newCompleted
    ) external onlyOperator {
        completed[getCompletedKey(key)] = newCompleted;
    }

    function getCompletedKey(ExchangeDomainV1.OrderKey memory key)
        public
        pure
        returns (bytes32)
    {
        return
            keccak256(
                abi.encodePacked(
                    key.owner,
                    key.sellAsset.token,
                    key.sellAsset.tokenId,
                    key.buyAsset.token,
                    key.buyAsset.tokenId,
                    key.salt
                )
            );
    }
}
