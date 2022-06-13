import MultiERC20Contract from "./contracts/MultiERC20.json";
import {ethers} from 'ethers';



export function EthConnect(){
    //const coin = await getUserCoin(this.props.userId);
    // If you don't specify a //url//, Ethers connects to the default 
    // (i.e. ``http:/\/localhost:8545``)
    const EthProvider = new ethers.providers.JsonRpcProvider();

    // The provider also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...
    const EthSigner = EthProvider.getSigner();

    return {EthProvider, EthSigner};
} 

export function getMultiERC20Contract(signer){
    const contractAddress = "0x2Fe353526ad79C3669605E366cB44BEf589390aA";
    const contract = new ethers.Contract(
        contractAddress,
        MultiERC20Contract.abi,
        signer
    );
    return contract;
}