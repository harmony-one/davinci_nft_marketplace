const DigitalEnergyToken = artifacts.require("DigitalEnergyToken");
var chaiAsPromised = require("chai-as-promised");
const { assert } = require("chai").use(chaiAsPromised);

contract("DigitalEnergyToken Test", (accounts) => {
  const [alice, bob, john, minter, dev, burner, clean, clean2] = accounts;
  let digitalenergyToken;
  beforeEach(async () => {
    digitalenergyToken = await DigitalEnergyToken.deployed();
  });

  it("Should create the contracts correctly", async () => {
    console.log("Digital Energy Token created at ", digitalenergyToken.address);
  });

  it("Should mint the HRC721 nft correctly", async () => {
    const totalSupply = await digitalenergyToken.totalSupply();
    assert.equal(totalSupply.toNumber(), 0);
    const tokenId = totalSupply + 1;

    const sha = web3.utils.soliditySha3(digitalenergyToken.address, tokenId);

    const sign = web3.eth.accounts.sign(sha, "0x35a0bb35f0509729bb701962d3a5c6ca9af49f07a1e67e381b6ec80eed8d86a4");
    const { v, r, s } = sign;

    await digitalenergyToken.mint(tokenId, v, r, s, [], "/item/1", { from: alice });

    const balance = await digitalenergyToken.balanceOf(alice);

    assert.equal(balance.toNumber(), 1);

    assert.equal((await digitalenergyToken.totalSupply()).toNumber(), 1);

    const uri = await digitalenergyToken.tokenURI(tokenId);

    assert.equal(uri, "https://digitalenergy.xyz/token/item/1");
  });
});
