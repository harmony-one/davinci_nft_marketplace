var DavinciMultipleToken = artifacts.require("DavinciMultipleToken");

module.exports = function(deployer) {
  deployer.then(function() {
    return deployer
      .deploy(
        DavinciMultipleToken,
        "Davinci",
        "VINC",
        deployer.address,
        "CONTRACT_URI",
        "TOKEN_URI"
      )
      .then(function(token) {
        console.log(`DavinciMultipleToken is deployed at ${token.address}`);
      });
  });
};
