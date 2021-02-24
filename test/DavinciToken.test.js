const DavinciToken = artifacts.require("DavinciToken");
var chaiAsPromised = require("chai-as-promised");
const { expect, assert } = require("chai").use(chaiAsPromised);

contract("DavinciToken Test", (accounts) => {
  const [alice, bob, john, minter, dev, burner, clean, clean2] = accounts;
  let davinciToken;
  beforeEach(async () => {
    davinciToken = await DavinciToken.deployed();
  });
  it("Should create the contracts correctly", async () => {
    console.log("Davinci Token created at ", davinciToken.address);
  });
  it("Should mint the HRC721 nft correctly", async () => {});
});
