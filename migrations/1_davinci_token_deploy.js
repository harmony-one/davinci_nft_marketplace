var DavinciToken = artifacts.require("DavinciToken");

module.exports = function(deployer) {
  deployer.then(function() {
    return deployer
      .deploy(
        DavinciToken,
        "Davinci",
        "VINC",
        deployer.address,
        "CONTRACT_URI",
        "TOKEN_URI"
      )
      .then(function(token) {
        console.log(`DavinciToken is deployed at ${token.address}`);
      });
  });
};
