
import React from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Row, Form, Table, Container, Button} from 'react-bootstrap';

//import {updateUserCoin, getUserCoin} from '../graphql/queries';

//import MultiERC20Contract from "../contracts/MultiERC20.json";
import {ethers} from 'ethers';
import {AppContext} from '../AppContext';


class CoinStatus extends React.Component {

    static contextType = AppContext;

    state = {  
        ownerList: []  
    };

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    async componentDidMount(){

        //const coin = await getUserCoin(this.props.userId);
        // If you don't specify a //url//, Ethers connects to the default 
        // (i.e. ``http:/\/localhost:8545``)
        //const provider = new ethers.providers.JsonRpcProvider();
        const provider = this.context.EthProvider;

        // The provider also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, we need the account signer...
        const signer = this.context.EthSigner;

        //const accounts = await provider.listAccounts();
        if(this.props.user){
            const address = this.props.user.walletAddress;
            const coinName = await this.context.multiERC20Contract.name(address);
            const symbol = await this.context.multiERC20Contract.symbol(address);
            const totalsupply = await this.context.multiERC20Contract.totalSupply(address);
            console.log("coin name:" + coinName);
        }

    }

    async update(event){
        event.preventDefault();
    }

    async viewOwner(event){
        event.preventDefault();
    }

    render(){
	    return(
<Container>
    <Row>
        <Form onSubmit={this.update}>
            <Button id="register-btn" variant="primary" type="submit">
                Update
            </Button>
        </Form>
    </Row>
    <Row>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Amount</th>
            </tr>
        </thead>
        <tbody>
                    {this.state.ownerList.map( (x,index)=>{return(
            <tr key={index}>
            <td>{index}</td>
            <td>{x.name}</td>
            <td><Button variant="primary" onClick={e=>this.viewOwner(index)}>Install</Button></td>
            <td></td>
            </tr>
                    )})}
        </tbody>
        </Table>
    </Row>

</Container>

	    );
    }
}

export default CoinStatus;


