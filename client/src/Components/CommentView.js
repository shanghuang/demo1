import React from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap';
//import {useForm} from 'react-hook-form';
//import {QUERY_COMMENT} from '../graphql/queries';
//import { useQuery, useMutation} from "@apollo/client";
//import CommentPost from './CommentPost';

const CommentView = (props) => {

    const comment = props.comment;
    //const [matchedUsers, setMatchedUsers] = useState([]);
    //const [orderId, setOrderId] = useState(null);

    //const {/*register,   getValues, handleSubmit ,formState : {errors}*/ } = useForm();
    //const [AddOrder/*, { orderData, orderUpdateLoading, orderUpdateError }*/] = useMutation(MUTATION_ADD_ORDER);

    //const onError = (errors, e) => console.log(errors, e);


    //var postIsMine = props.userId && props.userId === props.post.user;

    const api_server = "http://127.0.0.1:3000";
    //const avatarPath = post.avatar ? api_server+'/avatar/50/' + post.avatar : `/img/avatar-none.jpg`
    const avatarPath = api_server+ '/avatar/50/img/avatar-none.jpg';

	return(
    <Container>
        <Row>
            <Col >
                <img className="profile-icon" src={ avatarPath  } alt="..." width="50" height="50" />
            </Col>
            <Col>
                <span className="poster-name">{comment.userId}&nbsp;</span>
            </Col>
        </Row>
        <Row>
            <span className="poster-name">{comment.text}&nbsp;</span>
        </Row>
    </Container>

	);
}

export default CommentView;


