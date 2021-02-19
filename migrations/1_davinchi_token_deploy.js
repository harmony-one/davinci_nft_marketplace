var DavinchiToken = artifacts.require("DavinchiToken");

module.exports = function(deployer) {
  deployer.then(function() {
    return deployer
      .deploy(
        DavinchiToken,
        "Davinchi",
        "VINCH",
        deployer.address,
        "CONTRACT_URI",
        "TOKEN_URI"
      )
      .then(function(token) {
        console.log(`DavinchiToken is deployed at ${token.address}`);
      });
  });
};
