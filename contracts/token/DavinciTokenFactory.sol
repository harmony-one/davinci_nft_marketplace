// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import './DavinciToken.sol';

contract DavinciTokenFactory {

    event DavinciTokenCreated(address token, address owner, string name, string symbol, string contractURI, string tokenURIPrefix);

    function createDavinciToken(
      string memory name,
      string memory symbol,
      string memory contractURI,
      string memory tokenURIPrefix
    ) external {
        DavinciToken token = new DavinciToken(name, symbol, msg.sender, contractURI, tokenURIPrefix);
        emit DavinciTokenCreated(address(token), msg.sender, name, symbol, contractURI, tokenURIPrefix);
    }
}

