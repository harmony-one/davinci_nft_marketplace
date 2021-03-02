var TransferProxy = artifacts.require("TransferProxy");

module.exports = function(deployer) {
  deployer.then(function() {
    return;
    return deployer.deploy(TransferProxy).then(function(token) {
      console.log(`TransferProxy is deployed at ${token.address}`);
    });
  });
};
