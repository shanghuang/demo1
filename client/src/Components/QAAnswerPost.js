import React, {  useState } from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Form, Button, Card} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { MutationAddQAAnswerPost} from '../graphql/queries';
//import { useQuery, useMutation} from "@apollo/client";

/*
    .provide premium for solution provider
        =>could be a contract
    props: 
        answersID
*/

const QAAnswerPost = (props) => {

    //const [/*matchedUsers,*/ setMatchedUsers] = useState([]);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit, setValue /*,formState : {errors}*/ } = useForm();
    //const [AddOrder/*, { orderData, orderUpdateLoading, orderUpdateError }*/] = useMutation(MUTATION_ADD_ORDER);

    //todo: lift state up to QAQuestion
    const OnCreateAnswerPost = async (values, e) => {
        console.log(values, e);
        const text = getValues("PostAnswer");
        let data = {
            "userId" : props.userId,
            "text": text,
            "date":Date.now()
        };
        //
        const newAnswer = await MutationAddQAAnswerPost(props.answersId, data);
        
        //setMatchedUsers(data);
        props.addAnswerCallback(newAnswer?.result);

        setValue("PostAnswer");
    }

    const onError = (errors, e) => console.log(errors, e);

    /*const Follow = async (event) => {
        let index = event.target.getAttribute('row_index');
        const followId = matchedUsers[index].id;
        const res = await MutationAddFollow(props.userId, followId);
    }*/

	return(
<Card style={{ width: '32rem' }} >
<Form onSubmit={handleSubmit(OnCreateAnswerPost, onError)}>

    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
        <Card.Title>Add answer!</Card.Title>
        <Form.Control as="textarea" rows="3" name="address" id="qaAnswerPostInput" {...register("PostAnswer")}/>

        
    </Card.Body>

    <Card.Footer>
        <Button type="submit" id="postAnswerBtn">Post</Button>
    </Card.Footer>
</Form>
</Card>

	);
}

export default QAAnswerPost;


