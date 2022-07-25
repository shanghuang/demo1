import React, {  useState, useContext } from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Form, Button, Card} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { MutationAddQAPost} from '../graphql/queries';

//
import QARewardContract from "../contracts/QAReward.json";
import {ethers} from 'ethers';
import {getQARewardContract} from "../EthLib";
import {AppContext} from '../AppContext';

/*
    .provide premium for solution provider
        =>could be a contract
*/

const QAPost = (props) => {

    const context = useContext(AppContext);
    const [/*matchedUsers,*/ setMatchedUsers] = useState([]);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit /*,formState : {errors}*/ } = useForm();
    //const [AddOrder/*, { orderData, orderUpdateLoading, orderUpdateError }*/] = useMutation(MUTATION_ADD_ORDER);
    const OnCreatePost = async (values, e) => {
        console.log(values, e);
        const text = getValues("PostText");
        let data = {
            "user" : props.userId,
            "text": text,
            "date":Date.now()
        };
        const result = await MutationAddQAPost(data);
        
        //setMatchedUsers(data);

        

        //QARewardContract
        const interval = 7 ;
        let targetDate = new Date();
        targetDate.setDate(targetDate.getDate()+interval);

        const balance = await context.EThProvider.getBalance(props.user.walletAddress);
        console.log("balance:", balance);
        //const signerOfUser = context.EThProvider.getSigner( props.user.walletAddress );
        let wallet = new ethers.Wallet(props.user.privateKey, context.EThProvider);

        

        //const qareward = getQARewardContract(wallet);//signerOfUser);
        const qareward = context.qarewardContract;
        const name1 = await qareward.name();
        console.log("name:", name1);

        const questionId = result.result;
        console.log("questionId:", typeof(questionId), questionId);

        const tx = await qareward.proposeAward(questionId, targetDate.valueOf(), {value:1000 });
        console.log("transaction hash:", tx.hash);
        await tx.wait();

        
        let awardGet = await qareward.getProposeAward(questionId);
        console.log("awardGet:", result, ",",  awardGet);
    }

    const onError = (errors, e) => console.log(errors, e);

    /*const Follow = async (event) => {
        let index = event.target.getAttribute('row_index');
        const followId = matchedUsers[index].id;
        const res = await MutationAddFollow(props.userId, followId);
    }*/

	return(
<Card style={{ width: '32rem' }} >
<Form onSubmit={handleSubmit(OnCreatePost, onError)}>

    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
        <Card.Title>Question:</Card.Title>
        <Form.Control as="textarea" id="questionInput" readOnly={props.readOnly} defaultValue={props.question?.text} rows="3" name="address"  {...register("PostText")}/>

        
    </Card.Body>

    <Card.Footer>
        <Button type="submit" id="postBtn">Post</Button>
    </Card.Footer>
</Form>
</Card>

	);
}

export default QAPost;


