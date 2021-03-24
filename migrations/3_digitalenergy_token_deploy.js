var DDigitalEnergyToken = artifacts.require("DigitalEnergyToken");

module.exports = function(deployer) {
  deployer.then(function() {
    return;
    const admin = "0x8AF062f0675f4C71c2b2b4aF44f16D28aE29dc98";
    return deployer
      .deploy(DavinciToken, "DigitalEnergy", "DIEN", admin, "https://ipfs.io/ipfs", "https://ipfs.io/ipfs")
      .then(function(token) {
        console.log(`DigitalEnergyToken is deployed at ${token.address}`);
      });
  });
};
