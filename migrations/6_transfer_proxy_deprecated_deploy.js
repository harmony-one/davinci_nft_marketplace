var TransferProxyForDeprecated = artifacts.require("TransferProxyForDeprecated");

module.exports = function(deployer, network) {
  if (network === "test") return;
  deployer.then(function() {
    return;
    return deployer.deploy(TransferProxyForDeprecated).then(function(token) {
      console.log(`TransferProxyForDeprecated is deployed at ${token.address}`);
    });
  });
};
