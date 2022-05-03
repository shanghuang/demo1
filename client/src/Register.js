import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import {Form,  Button} from 'react-bootstrap';
//import FormGroup  from './Component/formgroup'
//import validate from 'validate.js'
import {addUser} from './graphql/queries';
//import client from './graphql/client';

class Register extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword:false,
      error_message:'',
      validateError: false,
      registration_success:false,
      isLoading : false,
    };
    //console.log('constructor!');
    this.register = this.register.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConformPasswordChange = this.handleConformPasswordChange.bind(this);
  }

  async register(event){
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

    if(this.password !== this.confirmPassword){
      this.state.error_message = 'password does not match!';
      return;
    };

    //todo:catch errors. https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples
    //let response = await api_social.post('/user/add',data);
    let res = await addUser(data);
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

  handleEmailChange(event){
		this.setState({email: event.target.value});
	}

  handlePasswordChange(event){
		this.setState({password: event.target.value});
	}

  handleConformPasswordChange(event){
		this.setState({confirmPassword: event.target.value});
	}
  

  render(){
    if(this.state.registration_success){
      return (<Navigate to='/login'/>);
    }

    //var validateError = this.state.validateError;

    return(
    <Form onSubmit={this.register}>
      <Form.Group controlid="email" size="lg">
        <Form.Label>Email</Form.Label>
        <Form.Control
          id="email-input"
          autoFocus
          type="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
      </Form.Group>
      <Form.Group controlid="password" size="lg">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password-input"
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
      </Form.Group>
      <Form.Group controlid="confirmPassword" size="lg">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          id="password-confirm-input"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.handleConformPasswordChange}
        />
      </Form.Group>
      <Button id="register-btn" variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  );}
}



export default Register;
