async function sign(message, account) {
  const sign = (await web3.eth.sign(message, account)).substr(2, 130);
  let v = parseInt(sign.substr(128, 2));
  v = v < 27 ? v + 27 : v;
  const r = "0x" + sign.substr(0, 64);
  const s = "0x" + sign.substr(64, 64);
  return { v, r, s };
}
module.exports = {
  sign,
};
