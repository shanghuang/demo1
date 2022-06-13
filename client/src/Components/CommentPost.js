import React from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {MutationAddComment} from '../graphql/queries';
////////////////////////////////import { useQuery, useMutation} from "@apollo/client";


const CommentPost = (props) => {

    const post = props.post;
    //const [matchedUsers, setMatchedUsers] = useState([]);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit /*,formState : {errors}*/ } = useForm();
    //const [AddOrder/*, { orderData, orderUpdateLoading, orderUpdateError }*/] = useMutation(MUTATION_ADD_ORDER);


    const OnAddComment = async (values, e) => {
        console.log(values, e);
        const text = getValues("commentText");
        let data = {
            "userId" : props.userId,
            "post" : post.id,
            "text": text,
            "date":Date.now()
        };
        /*const result =*/ await MutationAddComment(post.comments, data);
        
        //setMatchedUsers(data);
    }

    const onError = (errors, e) => console.log(errors, e);


	return(
    <Form onSubmit={handleSubmit(OnAddComment, onError)}>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="newComment">
                    <Form.Control type="text" placeholder="Leave a comment ..." {...register("commentText")}/>
                </Form.Group>
            </Col>
            <Col sm={1}>
                <Button variant="primary" type="submit" className="float-end">
                    Submit
                </Button>
            </Col>
        </Row>
    </Form>
	);
}

export default CommentPost;


