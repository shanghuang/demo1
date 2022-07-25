const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("QAReward", function () {

    const QUESTION_ID="2233445566"; 
    const TARGET_DATE= 1234567890;
    const ANSWER1_ID ="1111111111"; 
    const ANSWER2_ID ="2222222222"; 
    const ANSWER3_ID ="3333333333"; 

    async function deployContract() {
    
        // Contracts are deployed using the first signer/account by default
        const [owner, qAccount, aAccount1, aAccount2, aAccount3] = await ethers.getSigners();

        const qarewardFactory = await ethers.getContractFactory("QAReward");
        const qareward = await qarewardFactory.deploy("QAReward","qareward");
    
        await qareward.deployed();

        //const ownerBalance = await ethers.provider.balanceOf(owner.address);
        var prov = ethers.getDefaultProvider();
        const ownerBalance = await prov.getBalance(owner.address);
        console.log("ownerBalance:", ownerBalance);
        return { qareward, owner, qAccount, aAccount1, aAccount2, aAccount3 };
      }

      
    it("Should init", async function () {
        const { qareward, owner, qAccount, aAccount1, aAccount2, aAccount3 } = await deployContract();

        //console.log(owner.address);
        /*console.log(owner);
        console.log(qAccount);
        console.log(aAccount1);
        console.log(aAccount2);
        console.log(aAccount3);*/
        console.log(qAccount.address);

        expect(await qareward.owner()).to.equal(owner.address);
    });

    it("Should add question and provide reward", async function () {
        const { qareward, owner, qAccount, aAccount1, aAccount2, aAccount3 } = await deployContract();

        qareward.connect(qAccount).proposeAward(QUESTION_ID, TARGET_DATE,{value:ethers.utils.parseEther("1.0") });

        const reward_get = await qareward.connect(qAccount).getProposeAward(QUESTION_ID);
        console.log("reward_get:", reward_get);
        expect( reward_get.eq(ethers.utils.parseEther("1.0")) );
    });

    it("Should update answerer ranking", async function () {
        const { qareward, owner, qAccount, aAccount1, aAccount2, aAccount3 } = await deployContract();

        //qareward.connect(qAccount).proposeAward(QUESTION_ID, TARGET_DATE,{value:ethers.utils.parseEther("1.0") });
        const res = await qareward.connect(qAccount).proposeAward(QUESTION_ID, TARGET_DATE,{value:1000 });
        console.log("proposeAward res:", res);
        const wait_res = await res.wait();
        console.log("wait_res :", wait_res);
        const reward_get = await qareward.connect(qAccount).getProposeAward(QUESTION_ID);
        
        console.log("reward_get:", reward_get);

        await qareward.updateAnswerRanking(QUESTION_ID, 1, aAccount1.address, ANSWER1_ID);
        await qareward.updateAnswerRanking(QUESTION_ID, 2, aAccount2.address, ANSWER2_ID);
        await qareward.updateAnswerRanking(QUESTION_ID, 3, aAccount3.address, ANSWER3_ID);

        var account1_get = await qareward.getAnswerRanking(QUESTION_ID, 1);
        var account2_get = await qareward.getAnswerRanking(QUESTION_ID, 2);
        var account3_get = await qareward.getAnswerRanking(QUESTION_ID, 3);

        console.log("account1_get:", account1_get);
        console.log("account2_get:", account2_get);
        console.log("account3_get:", account3_get);
        expect( account1_get ).to.equal( ANSWER1_ID );


        var prov = ethers.getDefaultProvider();
        //const ownerBalance = await prov.getBalance(owner.address);

        const questionBalance = await prov.getBalance(qAccount.address);
        console.log("questionBalance:", questionBalance);
        const aAccount1Balance = await prov.getBalance(aAccount1.address);
        console.log("aAccount1Balance:", aAccount1Balance);
        const aAccount2Balance = await prov.getBalance(aAccount2.address);
        console.log("aAccount2Balance:", aAccount2Balance);
        const aAccount3Balance = await prov.getBalance(aAccount3.address);
        console.log("aAccount3Balance:", aAccount3Balance);

        await qareward.award(QUESTION_ID);


        const questionBalanceafter = await prov.getBalance(qAccount.address);
        console.log("questionBalanceafter:", questionBalanceafter);
        const aAccount1BalanceAfter = await prov.getBalance(aAccount1.address);
        console.log("aAccount1BalanceAfter:", aAccount1BalanceAfter);
        const aAccount2BalanceAfter = await prov.getBalance(aAccount2.address);
        console.log("aAccount2BalanceAfter:", aAccount2BalanceAfter);
        const aAccount3BalanceAfter = await prov.getBalance(aAccount3.address);
        console.log("aAccount3BalanceAfter:", aAccount3BalanceAfter);
    });

});