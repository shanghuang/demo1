import React, {  useState } from 'react';
//import {  Link , Navigate} from 'react-router-dom'
import {Form, FormControl, Row, Col, InputGroup, Button, Table} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {queryUserByKeyword, MutationAddFollow} from './graphql/queries';
//import { useQuery, useMutation} from "@apollo/client";

/**
 * props:
 * 		.onLogin : callback function
 * 
 * func:
 * 		.call api with (username, password) to get access token
 * 
 * api:
 * 		api_social.post('/access_token')
 */


const Search = (props) => {

    const [matchedUsers, setMatchedUsers] = useState([]);
    //const [orderId, setOrderId] = useState(null);

    const {register,   getValues, handleSubmit /*,formState : {errors}*/ } = useForm();
    //const [AddOrder/*, { orderData, orderUpdateLoading, orderUpdateError }*/] = useMutation(MUTATION_ADD_ORDER);
    const OnSubmit = async (values, e) => {
        console.log(values, e);
        const keyword = getValues("SearchKey");
        const data = await queryUserByKeyword(keyword);
        
        setMatchedUsers(data);
    }

    const onError = (errors, e) => console.log(errors, e);

    const Follow = async (event) => {
        let index = event.target.getAttribute('row_index');
        const followId = matchedUsers[index].id;
        /*const res =*/ await MutationAddFollow(props.userId, followId);
    }

	return(
<div>
<Form onSubmit={handleSubmit(OnSubmit, onError)}>
    <Row className="align-items-center">
        <Col sm={3} className="my-1">
        <Form.Label htmlFor="inlineFormInputSearchUserName" visuallyHidden>
            Keyword to search
        </Form.Label>
        <InputGroup>
            <FormControl id="inlineFormInputSearchUserName" placeholder="search" {...register("SearchKey")}/>
        </InputGroup>
        </Col>
        
        <Col xs="auto" className="my-1">
        <Button type="submit" id="searchUser">Search</Button>
        </Col>
    </Row>
    
</Form>
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Username</th>
      <th>Status</th>
      <th>Command</th>
    </tr>
  </thead>
  <tbody>
            {matchedUsers && matchedUsers.map( (x,index)=>{return(
    <tr key={index}>
      <td>{index}</td>
      <td>{x.email}</td>
      <td>Otto</td>
      <td><Button variant="primary" onClick={Follow} id={'SearchResultBtn'+index} row_index={index}>Follow</Button></td>
    </tr>
            )})}

  </tbody>
</Table>
</div>
	);
}

export default Search;
