import React, {  useState } from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Form, Button, Card, Row, Col} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { MutationAddQAAnswerScore} from '../graphql/queries';
//import { useQuery, useMutation} from "@apollo/client";


const QAAnswer = (props) => {

    //const [/*matchedUsers,*/ setMatchedUsers] = useState([]);
    const [answer, setAnswer] = useState(props.answer);
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
        const result = await MutationAddQAAnswerScore(answer?.scoresId, props.answersId, answer?.id, data);
        
        console.log(result);
        setAnswer(result.result);
        //setMatchedUsers(data);
    }

    const onError = (errors, e) => console.log(errors, e);

    let averageScore = 0;
    if(answer && answer.totalScorer){
        averageScore = answer.totalScore / answer.totalScorer;
    }

	return(
<Card style={{ width: '32rem' }} >
<Form onSubmit={handleSubmit(OnScoreAnswer, onError)}>

    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
        <Card.Title>Answer:</Card.Title>
        <Form.Control as="textarea" rows="3" readOnly defaultValue={answer.text} name="address"  {...register("PostText")}/>
    </Card.Body>

    <Card.Footer>
        <Row>
            <Col>
                <Form.Range value={answer.prevScore} min="1" max="10" name="score" id="rangeAnswer" {...register("Score")}/>
            </Col>
            <Col>
                <p >Averave score:{averageScore}</p>
                <p >Score count:{answer?.totalScorer}</p>
            </Col>
            <Col>
                <Button type="submit" id="postRangeBtn">Score</Button>
            </Col>
        </Row>
    </Card.Footer>
</Form>
</Card>

	);
}

export default QAAnswer;


//1152062512000705