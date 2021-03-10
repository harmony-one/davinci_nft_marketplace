const AssetType = { ETH: 0, ERC20: 1, ERC1155: 2, ERC721: 3, ERC721Deprecated: 4 };

const orderStruct = {
  Order: {
    key: {
      owner: "address",
      salt: "uint",
      sellAsset: {
        token: "address",
        tokenId: "uint",
        assetType: "uint",
      },
      buyAsset: {
        token: "address",
        tokenId: "uint",
        assetType: "uint",
      },
    },
    selling: "uint",
    buying: "uint",
    sellerFee: "uint",
  },
};

function Asset(token, tokenId, assetType) {
  return { token, tokenId, assetType };
}

function OrderKey(owner, salt, sellAsset, buyAsset) {
  return { owner, salt, sellAsset, buyAsset };
}

function Order(key, selling, buying, sellerFee) {
  return { key, selling, buying, sellerFee };
}

function getOrderHash(order) {
  const encoded = web3.eth.abi.encodeParameter(orderStruct, order);
  const orderHash = web3.utils.keccak256(encoded);
  return orderHash.substr(2, orderHash.length - 1);
}

function getBuyerFeeHash(order, buyerFee) {
  const encodestruct = [{ ...orderStruct }, "uint"];
  const encoded = web3.eth.abi.encodeParameters(encodestruct, [{ ...order }, buyerFee]);
  const buyerhash = web3.utils.keccak256(encoded);
  return buyerhash.substr(2, buyerhash.length - 1);
}

module.exports = {
  AssetType,
  OrderKey,
  Asset,
  Order,
  getOrderHash,
  getBuyerFeeHash,
};
