const DavinciMultipleToken = artifacts.require("DavinciMultipleToken");
var chaiAsPromised = require("chai-as-promised");
const { assert } = require("chai").use(chaiAsPromised);

contract("DavinciMultipleToken Test", (accounts) => {
  const [alice] = accounts;
  let davinciMultipleToken;
  beforeEach(async () => {
    davinciMultipleToken = await DavinciMultipleToken.deployed();
  });

  it("Should create the contracts correctly", async () => {
    console.log("DavinciMultipleToken created at ", davinciMultipleToken.address);
  });

  it("Should mint the HRC1155 nft correctly", async () => {
    const tokenId = 0;
    let tokenSupply = await davinciMultipleToken.balanceOf(alice, tokenId);
    assert.equal(tokenSupply.toNumber(), 0);

    const sha = web3.utils.soliditySha3(davinciMultipleToken.address, tokenId);

    const sign = web3.eth.accounts.sign(sha, "0x35a0bb35f0509729bb701962d3a5c6ca9af49f07a1e67e381b6ec80eed8d86a4");
    const { v, r, s } = sign;

    tokenSupply = 10;

    await davinciMultipleToken.mint(tokenId, v, r, s, [], tokenSupply, "/item/1", { from: alice });

    assert.equal((await davinciMultipleToken.balanceOf(alice, 0)).toNumber(), tokenSupply);

    const uri = await davinciMultipleToken.uri(tokenId);

    assert.equal(uri, "https://davinci.com/token/item/1");
  });
});
