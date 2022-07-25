
import React from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap';

import {updateUserWallet} from '../graphql/queries';

import {ethers} from 'ethers';



class Wallet extends React.Component {

    state = {  
        //icoAmount: 10000  
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

    async createAccountWallet(event){
        event.preventDefault();

        const wallet = ethers.Wallet.createRandom();
        console.log('address:', wallet.address);
        console.log('mnemonic:', wallet.mnemonic.phrase);
        console.log('privateKey:', wallet.privateKey);

        let data = {
            walletAddress: wallet.address,
            privateKey : wallet.privateKey,
        };

        let res = await updateUserWallet(this.props.userId, data);
        if(res){    //user
            console.log('update user:', res);

            const privateKey = "0x2fd2a199fb4eefd96087a01b1a627e41ae08d52726295d50b21368cef4ee5521";
            //move to serverURL// Create a wallet instance
            let createrWallet = new ethers.Wallet(privateKey, this.state.provider)
            // Receiver Address which receives Ether
            let receiverAddress = wallet.address;
            // Ether amount to send
            let amountInEther = '10.0';
            // Create a transaction object
            let tx = {
                to: receiverAddress,
                // Convert currency unit from ether to wei
                value: ethers.utils.parseEther(amountInEther)
            }
            // Send a transaction
            const txObj = await createrWallet.sendTransaction(tx);
            console.log('txHash', txObj.hash)
            //.then((txObj) => {
            //    console.log('txHash', txObj.hash)

            const balance = await this.state.provider.getBalance(receiverAddress);
            console.log('balance:', balance)
            //});
        }
    }


    render(){
	    return(
<Form onSubmit={this.createAccountWallet.bind(this)}>
    <Button id="register-icu-btn" variant="primary" type="submit">
            Create Wallet
    </Button>
</Form>

	    );
    }
}

export default Wallet;


