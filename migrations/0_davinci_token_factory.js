var DavinciTokenFactory = artifacts.require("DavinciTokenFactory");

module.exports = function(deployer) {
  deployer.then(function() {
    return deployer.deploy(DavinciTokenFactory).then(function(token) {
      console.log(`DavinciTokenFactory is deployed at ${token.address}`);
    });
  });
};
