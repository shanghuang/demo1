//import MultiERC20Contract from "./contracts/MultiERC20.json";
import QARewardContract from "./contracts/QAReward.json";

import {ethers} from 'ethers';



export function EthConnect(){
    //const coin = await getUserCoin(this.props.userId);
    // If you don't specify a //url//, Ethers connects to the default 
    // (i.e. ``http:/\/localhost:8545``)
    const EthProvider = new ethers.providers.JsonRpcProvider("http://192.168.1.77:8545");

    // The provider also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...
    const EthSigner = EthProvider.getSigner();

    return {EthProvider, EthSigner};
} 

/*export function getMultiERC20Contract(signer){
    const contractAddress = "0x2Fe353526ad79C3669605E366cB44BEf589390aA";
    const contract = new ethers.Contract(
        contractAddress,
        MultiERC20Contract.abi,
        signer
    );
    return contract;
}*/

export function getQARewardContract(signer){
    const contractAddress = "0xd3d9D47FC672d2FDC76aE653Ba25393b06145B5B";//"0xfe0cdBD67F84a3754e4fa170966EB992DB088848";
    const contract = new ethers.Contract(
        contractAddress,
        QARewardContract.abi,
        signer
    );
    return contract;
}

export function getQARewardContractByKey(privateKey, EThProvider){
    let wallet = new ethers.Wallet(privateKey, EThProvider);
    const qareward = getQARewardContract(wallet);

    const contractAddress = "0x9342c40306cC4EE9f5C0d5A7c76EF62201b45e5C";//"0xd3d9D47FC672d2FDC76aE653Ba25393b06145B5B";//"0xfe0cdBD67F84a3754e4fa170966EB992DB088848";
    const contract = new ethers.Contract(
        contractAddress,
        QARewardContract.abi,
        wallet
    );
    return contract;
}