var DigitalEnergyMultipleTokenFactory = artifacts.require("DigitalEnergyMultipleTokenFactory");

module.exports = function(deployer) {
  deployer.then(function() {
    return deployer.deploy(DigitalEnergyMultipleTokenFactory).then(function(token) {
      console.log(`DigitalEnergyMultipleTokenFactory is deployed at ${token.address}`);
    });
  });
};
