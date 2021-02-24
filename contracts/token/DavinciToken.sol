pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "../lib/interface/IERC721.sol";
import "../lib/contracts/ERC721Base.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

/**
 * @title DavinciToken
 * @dev anyone can mint token.
 */
contract DavinciToken is Ownable, IERC721, ERC721Base {

    constructor (string memory name, string memory symbol, address newOwner, string memory contractURI, string memory tokenURIPrefix) public ERC721Base(name, symbol, contractURI, tokenURIPrefix) {
        _registerInterface(bytes4(keccak256('MINT_WITH_ADDRESS')));
        transferOwnership(newOwner);
    }
    
    function mint(uint256 tokenId, uint8 v, bytes32 r, bytes32 s, Fee[] memory _fees, string memory tokenURI) public {
        require(owner() == ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", keccak256(abi.encodePacked(this, tokenId)))), v, r, s), "owner should sign tokenId");
        _mint(msg.sender, tokenId, _fees);
        _setTokenURI(tokenId, tokenURI);
    }

    function setTokenURIPrefix(string memory tokenURIPrefix) public onlyOwner {
        _setTokenURIPrefix(tokenURIPrefix);
    }

    function setContractURI(string memory contractURI) public onlyOwner {
        _setContractURI(contractURI);
    }
}