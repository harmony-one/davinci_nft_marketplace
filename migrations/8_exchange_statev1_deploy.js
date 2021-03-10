var ExchangeStateV1 = artifacts.require("ExchangeStateV1");

module.exports = function(deployer, network) {
  if (network === "test") return;
  deployer.then(function() {
    return deployer.deploy(ExchangeStateV1).then(function(token) {
      console.log(`ExchangeStateV1 is deployed at ${token.address}`);
    });
  });
};
