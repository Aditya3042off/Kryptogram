const Kryptogram = artifacts.require("Kryptogram");

module.exports = function (deployer) {
  deployer.deploy(Kryptogram);
};