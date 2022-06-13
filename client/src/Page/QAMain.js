import React, {  useState } from 'react';
import {  Link , Navigate, useNavigate} from 'react-router-dom'
import {Container, Form, FormControl, Row, Col, InputGroup, Button, ListGroup} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroller';

import {searchQAQuestions} from '../graphql/queries';
import QuestionPreview from '../Components/QuestionPreview';

const QAMain = (props) => {

    const [selectedQuestions, setSelectedQuestions] = useState(null);
    const [matchedQuestions, setMatchedQuestions] = useState([]);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit /*,formState : {errors}*/ } = useForm();

    const search = async () =>{
        //var token = this.props.cookies.get('access_token');
        //const token = React.useContext(TokenContext); 

        const keyword = getValues("questionKeyword");
        var res = await searchQAQuestions(keyword);
        setMatchedQuestions(res.questions || []);
    }

    const [hasMorePost/*, setHasMorePost*/] = useState(false);
    const handleAddPost = () => console.log("handleAddPost");
    const handleDeletePost = () => console.log("handleAddPost");

    const loadPost = () => {};

    let navigate = useNavigate();

    const itemClicked = (index) => {
        navigate('/qaquestion/'+matchedQuestions[index].id, { state: matchedQuestions[index] });
    };

    return(
<Container>
<Form onSubmit={handleSubmit(search.bind(this))}>
    <Row className="align-items-center">
        <Col sm={3} className="my-1">
        <Form.Label htmlFor="questionKeyword" visuallyHidden>
            Username to search
        </Form.Label>
        <InputGroup>
            <Form.Control type="text" id="questionKeyword" placeholder="Search Qeustion" {...register("questionKeyword")} />
        </InputGroup>
        </Col>
        
        <Col xs="auto" className="my-1">
        <Button type="submit" id="searchUser">Search</Button>
        </Col>
    </Row>
    
</Form>


<InfiniteScroll
        pageStart={0}
        loader={<div className="_text-center" key={0}>Loading ...</div>}
        loadMore={loadPost}
        hasMore={hasMorePost}
        key="scroller1">
        {
            matchedQuestions.map( (question, index) => {
                return (<ListGroup horizontal onClick={() => itemClicked(index)} key={"question"+index} >
                            <ListGroup.Item>{index}</ListGroup.Item>
                            <ListGroup.Item>{question.text}</ListGroup.Item>
                            <ListGroup.Item>{question.text}</ListGroup.Item>
                            <ListGroup.Item>{question.text}</ListGroup.Item>
                        </ListGroup>)

            })
        }
</InfiniteScroll>
    
</Container>
	);
}

export default QAMain;

/* =================================================================




*/

/**
                <QuestionPreview question={question} tableIndex={index} key={"question"+index} userId={props.userId} handleClick={itemClicked.bind(this)}/>

 */