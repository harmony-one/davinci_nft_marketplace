var ExchangeOrdersHolderV1 = artifacts.require("ExchangeOrdersHolderV1");

module.exports = function(deployer) {
  deployer.then(function() {
    return;
    return deployer.deploy(ExchangeOrdersHolderV1).then(function(token) {
      console.log(`ExchangeOrdersHolderV1 is deployed at ${token.address}`);
    });
  });
};
