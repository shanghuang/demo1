import React, {  useState } from 'react';
import {  Link , Navigate} from 'react-router-dom'
import {Container, Row, Column, Form, FormControl, Col, InputGroup, Button, Card} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {queryUserByKeyword, MutationAddFollow, MutationAddPost, QUERY_FEED} from '../graphql/queries';
import { useQuery, useMutation} from "@apollo/client";
import InfiniteScroll from 'react-infinite-scroller';
import PostBox from '../Components/PostBox';
import FeedPost from '../Components/FeedPost';

const Account = (props) => {

    const [matchedUsers, setMatchedUsers] = useState([]);
    const [hasMorePost, setHasMorePost] = useState(false);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit /*,formState : {errors}*/ } = useForm();

    const {  /*loading, error,*/ data} = useQuery(QUERY_FEED, {
        variables: { userId:props.userId },
    });

    //const [AddOrder/*, { orderData, orderUpdateLoading, orderUpdateError }*/] = useMutation(MUTATION_ADD_ORDER);
    const OnCreatePost = async (values, e) => {
        console.log(values, e);
        const text = getValues("PostText");
        let data = {
            "user" : props.userId,
            "text": text,
            "date":Date.now()
        };
        const result = await MutationAddPost(data);
        
        setMatchedUsers(data);
    }

    const onError = (errors, e) => console.log(errors, e);

    /*const Follow = async (event) => {
        let index = event.target.getAttribute('row_index');
        const followId = matchedUsers[index].id;
        const res = await MutationAddFollow(props.userId, followId);
    }*/
    const handleAddPost = () => console.log("handleAddPost");
    const handleDeletePost = () => console.log("handleAddPost");

    const loadPost = () => {

    }
    let feeds = [];
    if( data && data.feeds){
        feeds = data.feeds;
    }

	return(

<Container>
  <Row>
    <Col md={2}>1 of 2</Col>
    <Col md={8}>
        <PostBox userId={props.userId}  key="postbox1" onAddPost={handleAddPost} showIcon={true}/>


        <InfiniteScroll
            pageStart={0}
            loader={<div className="_text-center" key={0}>Loading ...</div>}
            loadMore={loadPost}
            hasMore={hasMorePost}
            key="scroller1">
            {
                feeds.map( (feed, index) => {
                return <FeedPost post={feed} key={"feed"+index} userId={props.userId} deletable={true} onDeletePost={handleDeletePost} />
              })
            }
          </InfiniteScroll>
    </Col>
  </Row>

</Container>


	);
}

export default Account;

