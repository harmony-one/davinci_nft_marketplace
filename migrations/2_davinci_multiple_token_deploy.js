var DavinciMultipleToken = artifacts.require("DavinciMultipleToken");

module.exports = function(deployer) {
  deployer.then(function() {
    const admin = "0x041e007da100b97656965dbe87b5de0d1d931766";
    return deployer
      .deploy(
        DavinciMultipleToken,
        "Davinci",
        "VINC",
        admin,
        "https://davinci.com/davinci-hrc721",
        "https://davinci.com/token/"
      )
      .then(function(token) {
        console.log(`DavinciMultipleToken is deployed at ${token.address}`);
      });
  });
};
