var DavinchiMultipleToken = artifacts.require("DavinchiMultipleToken");

module.exports = function(deployer) {
  deployer.then(function() {
    return deployer
      .deploy(
        DavinchiMultipleToken,
        "Davinchi",
        "VINCH",
        deployer.address,
        "CONTRACT_URI",
        "TOKEN_URI"
      )
      .then(function(token) {
        console.log(`DavinchiMultipleToken is deployed at ${token.address}`);
      });
  });
};
