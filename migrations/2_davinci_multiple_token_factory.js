var DavinciMultipleTokenFactory = artifacts.require("DavinciMultipleTokenFactory");

module.exports = function(deployer, network) {
  if (network === "test") return;
  deployer.then(function() {
    return;
    return deployer.deploy(DavinciMultipleTokenFactory).then(function(token) {
      console.log(`DavinciMultipleTokenFactory is deployed at ${token.address}`);
    });
  });
};
