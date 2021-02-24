const DavinciToken = artifacts.require("DavinciToken");
var chaiAsPromised = require("chai-as-promised");
const { expect, assert } = require("chai").use(chaiAsPromised);
const util = require("ethereumjs-util");

contract("DavinciToken Test", (accounts) => {
  const [alice, bob, john, minter, dev, burner, clean, clean2] = accounts;
  let davinciToken;
  beforeEach(async () => {
    // davinciToken = await DavinciToken.new(
    //   "Davinci",
    //   "VINC",
    //   alice,
    //   "https://davinci.com/davinci-hrc721",
    //   "https://davinci.com/token",
    //   { from: alice }
    // );
    davinciToken = await DavinciToken.deployed();
  });

  it("Should create the contracts correctly", async () => {
    console.log("Davinci Token created at ", davinciToken.address);
  });

  it("Should mint the HRC721 nft correctly", async () => {
    const totalSupply = await davinciToken.totalSupply();
    assert.equal(totalSupply.toNumber(), 0);
    const tokenId = 41;
    const res = await davinciToken.getHash(tokenId);
    console.log("kekcack256 response =============>", res);

    const sha = web3.utils.soliditySha3(davinciToken.address, tokenId);
    console.log("hash========>", sha);

    const sign = web3.eth.accounts.sign(sha, "0x35a0bb35f0509729bb701962d3a5c6ca9af49f07a1e67e381b6ec80eed8d86a4");
    const { v, r, s } = sign;
    console.log(sign);

    //await davinciToken.mint(41, v, r, s, [], "/item/1", { from: alice });
    const owner = await davinciToken.getOwner(tokenId, v, r, s);
    console.log("Original Owner: 0x041e007da100b97656965dbe87b5de0d1d931766, Recovered owner: ", owner);
    //assert.equal((await davinciToken.totalSupply()).toNumber(), 1);
  });
});
