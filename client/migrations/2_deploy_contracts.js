//const SimpleStorage = artifacts.require("SimpleStorage");
const MultiERC20 = artifacts.require("MultiERC20");
module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage, "MouseToken", "MST");
  //deployer.deploy(GroupBet, "GroupBetGame", "4TH");
  deployer.deploy(MultiERC20, "MultiERC20Coins", "TSM");
};
