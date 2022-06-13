import React, {  useState } from 'react';
import {  Link , Navigate, useNavigate, useParams, useLocation} from 'react-router-dom'
import {Container, Form, FormControl, Row, Col, InputGroup, Button, ListGroup} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroller';
import { useQuery, useMutation} from "@apollo/client";
import {QUERY_QA_ANSWERS, queryQAAnswers} from '../graphql/queries';
import QAPost from '../Components/QAPost';
import QAAnswerPost from '../Components/QAAnswerPost';
import QAAnswer from '../Components/QAAnswer';

/*
params : 
    id : question id

*/

const QAQuestion =(props) => {

    const { id } = useParams();
    const param = useLocation();
    const [selectedQuestions, setSelectedQuestions] = useState(null);
    const [matchedQuestions, setMatchedQuestions] = useState([]);
    const [hasMorePost/*, setHasMorePost*/] = useState(false);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit /*,formState : {errors}*/ } = useForm();

    const {  loading, error, data} = useQuery(QUERY_QA_ANSWERS, {
        variables: { answersId: param.state.answers},
    });// => data.question : info of this question

    if (loading ) return 'Loading...';



    const handleAddPost = () => console.log("handleAddPost");
    const handleDeletePost = () => console.log("handleAddPost");

    const loadPost = () => {};
    const itemClicked = () => {};


    if (loading ) return 'Loading...';

    return(
<Container>
    <QAPost viewonly="true"/>

    {data.answers && 
    <InfiniteScroll
            pageStart={0}
            loader={<div className="_text-center" key={0}>Loading ...</div>}
            loadMore={loadPost}
            hasMore={hasMorePost}
            key="scroller1">
            {
                data.answers.map( (answer, index) => {
                    return (<QAAnswer horizontal onClick={() => itemClicked(index)} key={"answer"+index} />)

                })
            }
    </InfiniteScroll>
    }
        
    {param.state &&    
    <QAAnswerPost answersId={param.state.answers}/>
    }

</Container>
	);
}

export default QAQuestion;

/**
answersID={}
 */