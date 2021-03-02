var DavinciMultipleTokenFactory = artifacts.require("DavinciMultipleTokenFactory");

module.exports = function(deployer) {
  deployer.then(function() {
    return deployer.deploy(DavinciMultipleTokenFactory).then(function(token) {
      console.log(`DavinciMultipleTokenFactory is deployed at ${token.address}`);
    });
  });
};
