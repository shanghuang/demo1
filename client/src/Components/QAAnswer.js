import React, {  useState } from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Form, Button, Card, Row, Col} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { MutationAddQAAnswerScore} from '../graphql/queries';
//import { useQuery, useMutation} from "@apollo/client";


const QAAnswer = (props) => {

    const [/*matchedUsers,*/ setMatchedUsers] = useState([]);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit /*,formState : {errors}*/ } = useForm();
    //const [AddOrder/*, { orderData, orderUpdateLoading, orderUpdateError }*/] = useMutation(MUTATION_ADD_ORDER);
    const OnScoreAnswer = async (values, e) => {
        console.log(values, e);
        //const text = getValues("PostText");
        const score = getValues("Score");
        let data = {
            "userId" : props.userId,
            //"text": text,
            "score":parseInt(score, 10),
            "date":Date.now()
        };
        /*const result = */await MutationAddQAAnswerScore(props.answer?.scoresId, props.answersId, props.answer?.id, data);
        
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
<Form onSubmit={handleSubmit(OnScoreAnswer, onError)}>

    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
        <Card.Title>Answer:</Card.Title>
        <Form.Control as="textarea" rows="3" readOnly defaultValue={props.answer.text} name="address"  {...register("PostText")}/>
    </Card.Body>

    <Card.Footer>
        <Row>
            <Col>
                <Form.Range value={props.answer.prevScore} min="1" max="10" name="score"  {...register("Score")}/>
            </Col>
            <Col>
                <Button type="submit" id="postBtn">Score</Button>
            </Col>
        </Row>
    </Card.Footer>
</Form>
</Card>

	);
}

export default QAAnswer;


//1152062512000705