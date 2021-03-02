
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../lib/utils/SignerRole.sol";
import "../lib/contracts/ERC1155Base.sol";

contract DavinciMultipleToken is Ownable, SignerRole, ERC1155Base {
    string public name;
    string public symbol;

    constructor(string memory _name, string memory _symbol, address newOwner, string memory contractURI, string memory tokenURIPrefix) ERC1155Base(contractURI, tokenURIPrefix) public {
        name = _name;
        symbol = _symbol;

        _registerInterface(bytes4(keccak256('MINT_WITH_ADDRESS')));
        transferOwnership(newOwner);
    }

    function addSigner(address account) public override onlyOwner {
        _addSigner(account);
    }

    function removeSigner(address account) public onlyOwner {
        _removeSigner(account);
    }

    function mint(uint256 id, uint8 v, bytes32 r, bytes32 s, Fee[] memory fees, uint256 supply, string memory uri) public {
        require(isSigner(ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", keccak256(abi.encodePacked(this, id)))), v, r, s)), "signer should sign tokenId");
        _mint(id, fees, supply, uri);
    }
}