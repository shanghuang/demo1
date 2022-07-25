import React, {  useState, useEffect, useCallback, useContext } from 'react';
import {  Link , Navigate, useNavigate, useParams, useLocation} from 'react-router-dom'
import {Container, Form, FormControl, Row, Col, InputGroup, Button, ListGroup} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroller';
import { useQuery, useMutation} from "@apollo/client";
import {QUERY_QA_ANSWERS, queryQAAnswers, getUser} from '../graphql/queries';
import QAPost from '../Components/QAPost';
import QAAnswerPost from '../Components/QAAnswerPost';
import QAAnswer from '../Components/QAAnswer';

import QARewardContract from "../contracts/QAReward.json";
import {ethers} from 'ethers';
import {getQARewardContract} from "../EthLib";
import {AppContext} from '../AppContext';
/*
params : 
    id : question id

*/

const QAQuestion =(props) => {

    const { id } = useParams();
    const param = useLocation();
    const context = useContext(AppContext);
    //const [selectedQuestions, setSelectedQuestions] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [hasMorePost/*, setHasMorePost*/] = useState(false);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit /*,formState : {errors}*/ } = useForm();

    const {  loading, error, data} = useQuery(QUERY_QA_ANSWERS, {
        variables: { answersId: param.state.answers},
    });// => data.question : info of this question

    //setAnswers(data?.answers);

    useEffect(() => {
        setAnswers(data?.answers);
    }, [data?.answers]);

    const addAnswerCallback = useCallback((newAnswer) => {
        let newAnswers = [...answers, newAnswer];
        setAnswers(newAnswers);
      }, [answers]);

    const handleAddPost = () => console.log("handleAddPost");
    const handleDeletePost = () => console.log("handleAddPost");

    const loadPost = () => {};
    const itemClicked = () => {};

    const award = async (values, e) => {
        const balance = await context.EThProvider.getBalance(props.user.walletAddress);
        console.log("balance:", balance);
        //const signerOfUser = context.EThProvider.getSigner( props.user.walletAddress );
        let wallet = new ethers.Wallet(props.user.privateKey, context.EThProvider);

        //const qareward = getQARewardContract(wallet);//signerOfUser);
        const qareward = context.qarewardContract;
        const name1 = await qareward.name();
        console.log("name:", name1);

        const questionId = param.state.id;
        console.log("typeof questionId:", typeof(questionId), questionId);
        let awardGet = await qareward.getProposeAward(questionId);
        console.log("awardGet:", questionId, ",", awardGet);

        let waddr=[];

        for(let i=0;i<3;i++){
            if(answers[i]){
                const user = await getUser(answers[i].userId);
                const walletAddress = user?.walletAddress;
                waddr[i] = walletAddress;
                const tx = await qareward.updateAnswerRanking(questionId, i, walletAddress, answers[i].userId);

                console.log("transaction hash:", tx.hash);
                await tx.wait();
        
                
                let rankingGet = await qareward.getAnswerRanking(questionId, i);
                console.log("rankingGet:",  rankingGet);
            }
        }

        for(let i=0;i<3;i++){
            if(waddr[i]){
                const balance = await context.EThProvider.getBalance(waddr[i]); 
                console.log("balance", i, ":", balance);
            }
        }



        const aw_tx = await qareward.award(questionId);

        console.log("transaction hash:", aw_tx.hash);
        await aw_tx.wait();

        for(let i=0;i<3;i++){
            if(waddr[i]){
                const balance = await context.EThProvider.getBalance(waddr[i]); 
                console.log("balance", i, ":", balance);
            }
        }

        context.qarewardContract.on( context.qarewardContract.filters.AwardSent(context.user.walletAddress), (receiver, sender, amount, event) => {  
            console.log("sender:",sender, " receiver:", receiver, " amount:", amount);
        });
    }

    if (loading ) return 'Loading...';

    return(
<Container id="qaQuestionPage">
    <Form onSubmit={handleSubmit(award.bind(this))}>
        <Row className="align-items-center">
            <Col xs="auto" className="my-1">
            <Button type="submit" id="searchQuestionBtn">Award</Button>
            </Col>
        </Row>
        
    </Form>

    <QAPost readonly="true" question={param.state}/>

    {answers &&
    <InfiniteScroll
            pageStart={0}
            loader={<div className="_text-center" key={0}>Loading ...</div>}
            loadMore={loadPost}
            hasMore={hasMorePost}
            key="scroller1"
            id="answersScroller">
            {
                answers?.map( (answer, index) => {
                    return (<QAAnswer horizontal onClick={() => itemClicked(index)} key={"answer"+index} answer={answer} viewer="true" userId={props.user.userId} answersId={param.state.answers}/>)

                })
            }
    </InfiniteScroll>
    }
        
    {param.state &&    
    <QAAnswerPost answersId={param.state.answers} addAnswerCallback={addAnswerCallback} userId={props.user.userId}/>
    }

</Container>
	);
}

export default QAQuestion;

/**

 */