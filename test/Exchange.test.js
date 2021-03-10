const ExchangeV1 = artifacts.require("ExchangeV1");
const ExchangeOrdersHolderV1 = artifacts.require("ExchangeOrdersHolderV1");
const ExchangeStateV1 = artifacts.require("ExchangeStateV1");
const DavinciToken = artifacts.require("DavinciToken");
const TransferProxy = artifacts.require("TransferProxy");
const ERC20TransferProxy = artifacts.require("ERC20TransferProxy");
const TransferProxyForDeprecated = artifacts.require("TransferProxyForDeprecated");
const DavinciMultipleToken = artifacts.require("DavinciMultipleToken");
var chaiAsPromised = require("chai-as-promised");
const { sign } = require("./sign");
const { AssetType, Order, OrderKey, Asset, getOrderHash, getBuyerFeeHash } = require("./order");

const { assert } = require("chai").use(chaiAsPromised);
const ZERO = "0x0000000000000000000000000000000000000000";

contract("Exchange V1 Test", (accounts) => {
  const [alice, bob, john, beneficiary, buyerFeeSigner] = accounts;
  let exchangeCore,
    davinciToken,
    davinciMultipleToken,
    exchangeState,
    exchangeOrderHolder,
    erc20TransferProxy,
    transferProxyForDeprecated,
    tranferProxy;
  beforeEach(async () => {
    davinciToken = await DavinciToken.new("Davinci", "VINC", alice, "https://ipfs.io/ipfs", "https://ipfs.io/ipfs");
    davinciMultipleToken = await DavinciMultipleToken.new(
      "Davinci",
      "VINC",
      alice,
      "https://ipfs.io/ipfs",
      "https://ipfs.io/ipfs"
    );
    exchangeState = await ExchangeStateV1.new();
    exchangeOrderHolder = await ExchangeOrdersHolderV1.new();
    erc20TransferProxy = await ERC20TransferProxy.new();
    transferProxy = await TransferProxy.new();
    transferProxyForDeprecated = await TransferProxyForDeprecated.new();

    exchangeCore = await ExchangeV1.new(
      transferProxy.address,
      transferProxyForDeprecated.address,
      erc20TransferProxy.address,
      exchangeState.address,
      exchangeOrderHolder.address,
      beneficiary,
      buyerFeeSigner
    );
    erc20TransferProxy.addOperator(exchangeCore.address);
    transferProxy.addOperator(exchangeCore.address);
    transferProxyForDeprecated.addOperator(exchangeCore.address);
    exchangeState.addOperator(exchangeCore.address);

    //minting hrc721 tokens
    let count = 5;
    for (var i = 0; i < count; i++) {
      const tokenId = i;
      const sha = web3.utils.soliditySha3(davinciToken.address, tokenId); //abi.encode
      const { v, r, s } = await sign(sha, alice);

      await davinciToken.mint(tokenId, v, r, s, [], `/721/item/${tokenId}`, { from: john });

      const uri = await davinciToken.tokenURI(tokenId);

      assert.equal(uri, `https://ipfs.io/ipfs/721/item/${tokenId}`);
    }
    const balance = await davinciToken.balanceOf(john);

    assert.equal(balance.toNumber(), count);
    assert.equal((await davinciToken.totalSupply()).toNumber(), count);

    //minting hrc1155 tokens
    for (var i = 0; i < count; i++) {
      const tokenId = i;
      let tokenSupply = await davinciMultipleToken.balanceOf(alice, tokenId);
      assert.equal(tokenSupply.toNumber(), 0);

      const sha = web3.utils.soliditySha3(davinciMultipleToken.address, tokenId);

      const { v, r, s } = await sign(sha, alice);

      tokenSupply = 10;

      await davinciMultipleToken.mint(tokenId, v, r, s, [], tokenSupply, `/item/${tokenId}`, { from: john });

      assert.equal((await davinciMultipleToken.balanceOf(john, tokenId)).toNumber(), tokenSupply);

      const uri = await davinciMultipleToken.uri(tokenId);

      assert.equal(uri, `https://ipfs.io/ipfs/item/${tokenId}`);
    }
  });

  it("Should create the contracts correctly", async () => {
    console.log("Deployer address ", alice);
    console.log("Beneficiary address ", beneficiary);
    console.log("BuyerFeeSigner address ", buyerFeeSigner);
    console.log("ExchangeV1 created at ", exchangeCore.address);
    console.log("ExchangeState created at ", exchangeState.address);
    console.log("ExchangeOrderHolder created at ", exchangeOrderHolder.address);
    console.log("ERC20TransferProxy created at ", erc20TransferProxy.address);
    console.log("TransferProxy created at ", transferProxy.address);
    console.log("TransferProxyForDeprecated created at ", transferProxyForDeprecated.address);
    console.log("DavinciToken created at ", davinciToken.address);
    console.log("DavinciMultipleToken created at ", davinciMultipleToken.address);
  });

  it("Should add the operator role correctly", async () => {
    assert(erc20TransferProxy.isOperator(exchangeCore.address), true);
    assert(transferProxy.isOperator(exchangeCore.address), true);
    assert(transferProxyForDeprecated.isOperator(exchangeCore.address), true);
    assert(exchangeState.isOperator(exchangeCore.address), true);
  });

  it("Should Add and Check Order Holder correctly", async () => {
    const order = Order(
      OrderKey(alice, 1, Asset(davinciToken.address, 0, AssetType.ERC721), Asset(ZERO, 0, AssetType.ETH)),
      10,
      10,
      1
    );
    await exchangeOrderHolder.add(order);
    assert.equal(await exchangeOrderHolder.exists(order), true);
  });

  it("Should exchange hrc721 order correctly", async () => {
    const order = Order(
      OrderKey(john, 1, Asset(davinciToken.address, 0, AssetType.ERC721), Asset(ZERO, 0, AssetType.ETH)),
      20,
      10,
      250
    );
    const orderSig = await sign(getOrderHash(order), john);

    const buyerFee = 250;
    const amount = 1;
    const buyer = ZERO;

    const buyerSig = await sign(getBuyerFeeHash(order, buyerFee), buyerFeeSigner);

    assert.equal((await davinciToken.balanceOf(bob)).toNumber(), 0);
    //approve
    davinciToken.setApprovalForAll(transferProxy.address, true, { from: john });

    console.log("Seller ==========> ", john);
    console.log("Buyer ==========> ", bob);

    console.log("bob eth balance ======> ", (await web3.eth.getBalance(bob)).toString());

    const res = await exchangeCore.exchange(order, orderSig, buyerFee, buyerSig, amount, buyer, { from: bob });

    console.log("bob eth balance after ======> ", (await web3.eth.getBalance(bob)).toString());
    assert.equal((await davinciToken.balanceOf(bob)).toNumber(), 1);
  });
});
