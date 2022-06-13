import React, {  useState } from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Form, Button, Card} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { MutationAddQAPost} from '../graphql/queries';
//import { useQuery, useMutation} from "@apollo/client";

/*
    .provide premium for solution provider
        =>could be a contract
*/

const QAPost = (props) => {

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
        /*const result = */await MutationAddQAPost(data);
        
        //setMatchedUsers(data);
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
        <Card.Title>Card Title</Card.Title>
        <Form.Control as="textarea" rows="3" name="address"  {...register("PostText")}/>

        
    </Card.Body>

    <Card.Footer>
        <Button type="submit" id="postBtn">Post</Button>
    </Card.Footer>
</Form>
</Card>

	);
}

export default QAPost;


