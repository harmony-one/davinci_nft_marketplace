var ExchangeV1 = artifacts.require("ExchangeV1");

const transferProxyAddress = "";
const transferProxyForDeprecated = "";
const erc20TransferProxy = "";
const exchangeStateV1 = "";
const exchangeOrderHolderV1 = "";
const beneficiary = "";
const buyerFeeSigner = "";

module.exports = function(deployer) {
  deployer.then(function() {
    return deployer
      .deploy(
        ExchangeV1,
        transferProxyAddress,
        transferProxyForDeprecated,
        erc20TransferProxy,
        exchangeStateV1,
        exchangeOrderHolderV1,
        beneficiary,
        buyerFeeSigner
      )
      .then(function(token) {
        console.log(`ExchangeV1 is deployed at ${token.address}`);
      });
  });
};
