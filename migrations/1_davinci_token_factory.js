var DavinciTokenFactory = artifacts.require("DavinciTokenFactory");

module.exports = function(deployer, network) {
  if (network === "test") return;
  deployer.then(function() {
    return;
    return deployer.deploy(DavinciTokenFactory).then(function(token) {
      console.log(`DavinciTokenFactory is deployed at ${token.address}`);
    });
  });
};
