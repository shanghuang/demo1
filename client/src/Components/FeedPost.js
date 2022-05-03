import React, {  useState } from 'react';
import {  Link , Navigate} from 'react-router-dom'
import {Tabs, Tab, Form, FormControl, Row, Col, InputGroup, Button, Card} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {QUERY_COMMENT} from '../graphql/queries';
import { useQuery, useMutation} from "@apollo/client";
import CommentPost from './CommentPost';
import CommentView from './CommentView';

const FeedPost = (props) => {

    const post = props.post;
    const [matchedUsers, setMatchedUsers] = useState([]);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit /*,formState : {errors}*/ } = useForm();
    //const [AddOrder/*, { orderData, orderUpdateLoading, orderUpdateError }*/] = useMutation(MUTATION_ADD_ORDER);
    const {  /*loading, error,*/ data} = useQuery(QUERY_COMMENT, {
        variables: { commentsId:post.comments },
    });

    const onError = (errors, e) => console.log(errors, e);

    /*const Follow = async (event) => {
        let index = event.target.getAttribute('row_index');
        const followId = matchedUsers[index].id;
        const res = await MutationAddFollow(props.userId, followId);
    }*/
    var postIsMine = props.userId && props.userId === props.post.user;

    const api_server = "http://127.0.0.1:3000";
    const avatarPath = post.avatar ? api_server+'/avatar/50/' + post.avatar : `/img/avatar-none.jpg`


	return(
<Card style={{ width: '32rem' }}>

    <Card.Header>
        <img className="profile-icon" src={ avatarPath  } alt="..." width="50" height="50" />
        <span className="poster-name">{post.user}&nbsp;</span>
    </Card.Header>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body></Card.Body>
    <Card.Body>
        <Card.Title>Card Title</Card.Title>

        <Card.Text>
            {post.text}
        </Card.Text>

        
    </Card.Body>

    <Card.Footer>
        {data && data.comments.map((comment, index)=>{
            return <CommentView comment={comment} key={"comment"+index}/> 
        })}
    </Card.Footer>
    <Card.Footer>

        <CommentPost post={post}  userId={props.userId} />

    </Card.Footer>

</Card>

	);
}

export default FeedPost;


