// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;
import './DavinciMultipleToken.sol';

contract DavinciMultipleTokenFactory {

    event DavinciMultipleTokenCreated(address token, address owner, string name, string symbol, string contractURI, string tokenURIPrefix);

    function createDavinciMultipleToken(
      string memory name,
      string memory symbol,
      string memory contractURI,
      string memory tokenURIPrefix
    ) external {
        DavinciMultipleToken token = new DavinciMultipleToken(name, symbol, msg.sender, contractURI, tokenURIPrefix);
        emit DavinciMultipleTokenCreated(address(token), msg.sender, name, symbol, contractURI, tokenURIPrefix);
    }
}

