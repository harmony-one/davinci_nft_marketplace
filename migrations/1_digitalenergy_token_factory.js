var DigitalEnergyTokenFactory = artifacts.require("DigitalEnergyTokenFactory");

module.exports = function(deployer) {
  deployer.then(function() {
    return deployer.deploy(DigitalEnergyTokenFactory).then(function(token) {
      console.log(`DigitalEnergyTokenFactory is deployed at ${token.address}`);
    });
  });
};
