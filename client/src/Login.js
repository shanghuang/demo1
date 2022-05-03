import React, { Component } from 'react';
import {  Link , Navigate } from 'react-router-dom'
import {Form,   Button} from 'react-bootstrap';
import {login} from './auth';
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
class Login extends Component{


	constructor(props){
		super(props);
    	this.state = {
			username: '',
			password: '',
			rememberMe: false,
			login_success: false
		};
		console.log('constructor!');
		this.handleLogin = this.handleLogin.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
	}

	handleChange(event){
		this.setState({username: event.target.value});
	}

	passwordChange(event){
		this.setState({password: event.target.value});
	}

	async handleLogin(event){
		event.preventDefault();

		console.log("calling login (/access_token)" );
		login(this.state.username, this.state.password).then( (userId) => {
            if (userId) {
              this.props.onLogin(userId);
			  this.setState({login_success: true});
            } else {
              this.setState({error: true});
            }
          });
	}


	render(){
		if(this.state.login_success){
			return (<Navigate to='/'/>);
			//return (<Link to='/'/>);
		}

		return(
<Form onSubmit={this.handleLogin}>
  <Form.Group className="mb-3"icontrolid="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" role="username" id="email-input" placeholder="Enter email" value={this.state.username} onChange={this.handleChange}/>
    <Form.Text className="text-muted" >
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlid="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" role="password" id="password-input" placeholder="Password" value={this.state.password} onChange={this.passwordChange}/>
  </Form.Group>
  <Form.Group className="mb-3" controlid="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit" role="loginSubmit" id="login-btn">
    Submit
  </Button>
  <Form.Label>
  	<Link to="/register" className="text-center" id="register-btn" controlid="register-page">Create an account </Link>
  </Form.Label>
</Form>

	);}
}

export default Login;
