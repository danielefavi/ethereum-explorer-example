const MessageCenter = artifacts.require("MessageCenter");

module.exports = function (deployer) {
  deployer.deploy(MessageCenter);
};
