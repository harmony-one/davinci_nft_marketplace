const DavinciToken = artifacts.require("DavinciToken");
var chaiAsPromised = require("chai-as-promised");
const { assert } = require("chai").use(chaiAsPromised);

contract("DavinciToken Test", (accounts) => {
  const [alice, bob, john, minter, dev, burner, clean, clean2] = accounts;
  let davinciToken;
  beforeEach(async () => {
    davinciToken = await DavinciToken.deployed();
  });

  it("Should create the contracts correctly", async () => {
    console.log("Davinci Token created at ", davinciToken.address);
  });

  it("Should mint the HRC721 nft correctly", async () => {
    const totalSupply = await davinciToken.totalSupply();
    assert.equal(totalSupply.toNumber(), 0);
    const tokenId = totalSupply + 1;

    const sha = web3.utils.soliditySha3(davinciToken.address, tokenId);

    const sign = web3.eth.accounts.sign(sha, "0x35a0bb35f0509729bb701962d3a5c6ca9af49f07a1e67e381b6ec80eed8d86a4");
    const { v, r, s } = sign;

    await davinciToken.mint(tokenId, v, r, s, [], "/item/1", { from: alice });

    const balance = await davinciToken.balanceOf(alice);

    assert.equal(balance.toNumber(), 1);

    assert.equal((await davinciToken.totalSupply()).toNumber(), 1);

    const uri = await davinciToken.tokenURI(tokenId);

    assert.equal(uri, "https://davinci.com/token/item/1");
  });
});
