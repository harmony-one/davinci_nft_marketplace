var DavinciMultipleToken = artifacts.require("DigitalEnergyMultipleToken");

module.exports = function(deployer) {
  deployer.then(function() {
    return;
    const admin = "0x8AF062f0675f4C71c2b2b4aF44f16D28aE29dc98";
    return deployer
      .deploy(DavinciMultipleToken, "DigitalEnergy", "DIEN", admin, "https://ipfs.io/ipfs/", "https://ipfs.io/ipfs/")
      .then(function(token) {
        console.log(`DigitalEnergyMultipleToken is deployed at ${token.address}`);
      });
  });
};
