
import React from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap';

import {updateUserCoin} from '../graphql/queries';

import MultiERC20Contract from "../contracts/MultiERC20.json";
import {ethers} from 'ethers';



class CoinRegister extends React.Component {

    state = {  
        icoAmount: 10000  
    };

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    async componentDidMount(){

        //const coin = await getUserCoin(this.props.userId);
        // If you don't specify a //url//, Ethers connects to the default 
        // (i.e. ``http:/\/localhost:8545``)
        const provider = new ethers.providers.JsonRpcProvider();

        // The provider also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, we need the account signer...
        const signer = provider.getSigner();

        //const accounts = await provider.listAccounts();

        this.setState({ 
            provider:provider,
            signer:signer,
        });

    }

    async createAccountICO(event){
        event.preventDefault();

        const wallet = ethers.Wallet.createRandom();
        console.log('address:', wallet.address);
        console.log('mnemonic:', wallet.mnemonic.phrase);
        console.log('privateKey:', wallet.privateKey);

        const contractAddress = "0x2Fe353526ad79C3669605E366cB44BEf589390aA";
        const contract = new ethers.Contract(
            contractAddress,
            MultiERC20Contract.abi,
            this.state.signer
        );

        // Call a getter method
        await contract.issue(wallet.address, "name of coin", "COIN1", 10000000000000);
        const coinName = await contract.name(wallet.address);
        const coinSymbol = await contract.symbol(wallet.address);
        console.log(`Contract name is ${coinName}`);

        let data = {
            walletAddress: wallet.address,
            privateKey : wallet.privateKey,
            coinName: coinName,
            coinSymbol: coinSymbol
        };

        let res = await updateUserCoin(this.props.userId, data);
        if(res){
            console.log('add user failed:', res);
        }
    }


    render(){
	    return(
<Form onSubmit={this.createAccountICO.bind(this)}>
    <Form.Group controlid="firstName" size="lg">
        <Form.Label>First Name</Form.Label>
        <Form.Control id="firstName-input" autoFocus type="text" name="icoAmount" value={this.state.icoAmount} onChange={this.handleChange.bind(this)}/>
    </Form.Group>
    <Button id="register-icu-btn" variant="primary" type="submit">
        ICO
    </Button>
</Form>

	    );
    }
}

export default CoinRegister;


