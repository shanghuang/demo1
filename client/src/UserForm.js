import React, { Component } from 'react';
//import { BrowserRouter, Route, Link, Navigate } from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap';
//import FormGroup  from './Component/formgroup'
//import validate from 'validate.js'
import { updateUser} from './graphql/queries';
import Wallet from './Components/Wallet';

//import client from './graphql/client';

class UserForm extends Component{
  
  constructor(props){
    super(props);
    /*this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword:false,
      error_message:'',
      validateError: false,
      registration_success:false,
      address:'',
      phoneNumber:'',
      isLoading : false,
    };*/
    this.state = {
        firstName : "name11",
        lastName : "name21",
        gender : "MALE",
        language : "Englist",
        age : 23,
        userName: "name1",//this.state.username.substring(0, 25),
        email : "user1@test.com",
        password : "123456",
        confirmPassword : "123456",
        contacts:[],
        registration_success:false,
        address:'address1',
        phoneNumber:'1233456',
        isLoading : false,
    };

    //console.log('constructor!');
    this.update = this.update.bind(this);
  }

  async update(event){
    event.preventDefault();
    var data = {
        "firstName" : "name11",
        "lastName" : "name21",
        "gender" : "MALE",
        "language" : "Englist",
        "age" : 23,
        "userName": "name1",//this.state.username.substring(0, 25),
        "email" : this.state.email.trim(),
        "password" : this.state.password,
        "address" : "",
        "contacts":[{
            "firstName" : "name3",
            "lastName" : "name4"
            }]
          };

    /*var validateError = this.validate(data);
    this.setState({ validateError: validateError });
    if(validateError) {
      return false;
    }*/

    let res = await updateUser(data);
    if(res){
			//var json = await response.json();
	    this.setState({registration_success:true});
		}
		else{
      console.log('add user failed:', res);
    }
  }

  /*validate(inputs) {

    var constraints = {
      name: {
        presence: {message: '* ' + 'Enter your full name'},
        length: {
          maximum: 30,
          tooLong: '* ' + 'Maximum length is 30 characters',
          },
      },
      email: {
        presence: {message: '* ' + 'Enter your email'},
        email: {message: '* ' + "Oops, that doesn't look like a valid email"},
      },
      password: {
        presence: {message: '* ' + 'Create a password'},
        length: {
          minimum: 8,
          tooShort: '* ' + 'Minimum length is 8 characters',
          },
      },
    };
    //return validate(inputs, constraints, {fullMessages: false});
  }*/

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  

  render(){

    //var validateError = this.state.validateError;

    return(
  <Container>
    <Form onSubmit={this.update}>
      <Form.Group controlid="email" size="lg">
        <Form.Label>Email</Form.Label>
        <Form.Control id="email-input" autoFocus type="email" name="title" value={this.state.email} onChange={this.handleChange.bind(this)}/>
      </Form.Group>

      <Form.Group controlid="password" size="lg">
        <Form.Label>Password</Form.Label>
        <Form.Control id="password-input" type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
      </Form.Group>

      <Form.Group controlid="confirmPassword" size="lg">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control id="password-confirm-input" type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange.bind(this)}/>
      </Form.Group>

      <Form.Group controlid="firstName" size="lg">
        <Form.Label>First Name</Form.Label>
        <Form.Control id="firstName-input" autoFocus type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange.bind(this)}/>
      </Form.Group>
      <Form.Group controlid="lastName" size="lg">
        <Form.Label>Last Name</Form.Label>
        <Form.Control id="lastName-input" autoFocus type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange.bind(this)}/>
      </Form.Group>

      <Form.Group controlid="gender" size="lg">
        <Form.Label>Gender</Form.Label>
        <Form.Select aria-label="Default select example" id="gender-input" autoFocus type="text" name="gender" value={this.state.gender} onChange={this.handleChange.bind(this)}>
            <option>Open this select menu</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            </Form.Select>
      </Form.Group>

      <Form.Group controlid="address" size="lg">
        <Form.Label>Address</Form.Label>
        <Form.Control id="address-input" autoFocus type="text" name="address" value={this.state.address} onChange={this.handleChange.bind(this)}/>
      </Form.Group>

      <Form.Group controlid="phoneNumber" size="lg">
        <Form.Label>Address</Form.Label>
        <Form.Control id="phoneNumber-input" autoFocus type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange.bind(this)}/>
      </Form.Group>

      <Button id="register-btn" variant="primary" type="submit">
        Update
      </Button>
  </Form>

  <Wallet userId={this.props.userId}></Wallet>
  
</Container>
  );}
}

export default UserForm;


//<CoinRegister userId={this.props.userId}></CoinRegister>