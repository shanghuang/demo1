import React, {  useState } from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Container, ListGroup} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroller';

import {searchQAQuestions} from '../graphql/queries';

const QuestionPreview = (props) => {
    const question = props.question;

    return(
        <Container>
            <ListGroup horizontal onClick={props.handleClick(props.index)} >
                <ListGroup.Item>{props.tableIndex}</ListGroup.Item>
                <ListGroup.Item>{question.text}</ListGroup.Item>
                <ListGroup.Item>{question.text}</ListGroup.Item>
                <ListGroup.Item>{question.text}</ListGroup.Item>
            </ListGroup>
        </Container>
	);
}

export default QuestionPreview;