const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiERC20", function () {
  it("Should init", async function () {
    const MultiERC20 = await ethers.getContractFactory("MultiERC20");
    const multiERC20 = await MultiERC20.deploy("Multi ERC20","MultiERC20");
    await multiERC20.deployed();

    const [owner, addr1] = await ethers.getSigners();
    console.log(owner.address);
    await multiERC20.issue(owner.address, "COIN1", "COIN1", 10000000000000);

    let supply = await multiERC20.totalSupply(owner.address);
    expect(supply).to.equal(10000000000000);
    

    await multiERC20.mint(owner.address, addr1.address, 22222);
    await multiERC20.mint(owner.address, owner.address, 100000);

    let addr1Balance = await multiERC20.balanceOf(owner.address, addr1.address);

    console.log(addr1Balance);
    expect(addr1Balance).to.equal(22222);

    await multiERC20.approve(owner.address, addr1.address, 1000);

    let allowenceAddr1Toowner = await multiERC20.allowance(owner.address, owner.address, addr1.address);
    console.log("allowenceAddr1Toowner:", allowenceAddr1Toowner);

    await multiERC20.transfer(owner.address, addr1.address, 1000);

    let addr1BalanceAfterTx = await multiERC20.balanceOf(owner.address, addr1.address);
    console.log(addr1BalanceAfterTx);
    expect(addr1BalanceAfterTx).to.equal(23222);

    //expect(await greeter.greet()).to.equal("Hello, world!");

    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    //await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});