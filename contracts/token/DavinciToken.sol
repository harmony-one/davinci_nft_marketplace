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

    function getHash(uint256 tokenId) public view returns(bytes32) {
        return keccak256(abi.encodePacked(this, tokenId));
    }

    function getOwner(uint256 tokenId, uint8 v, bytes32 r, bytes32 s) public view returns (bytes32){
        return ecrecover(keccak256(abi.encodePacked(this, tokenId)), v, r, s);
    }

    function mint(uint256 tokenId, uint8 v, bytes32 r, bytes32 s, Fee[] memory _fees, string memory tokenURI) public {
        console.log("owner in solidity ===>", ecrecover(keccak256(abi.encodePacked(this, tokenId)), v, r, s));
        require(owner() == ecrecover(keccak256(abi.encodePacked(this, tokenId)), v, r, s), "owner should sign tokenId");
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