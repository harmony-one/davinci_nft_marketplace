var DavinciToken = artifacts.require("DavinciToken");

module.exports = function(deployer) {
  deployer.then(function() {
    return;
    const admin = "0x041e007da100b97656965dbe87b5de0d1d931766";
    return deployer
      .deploy(DavinciToken, "Davinci", "VINC", admin, "https://ipfs.io/ipfs", "https://ipfs.io/ipfs")
      .then(function(token) {
        console.log(`DavinciToken is deployed at ${token.address}`);
      });
  });
};
