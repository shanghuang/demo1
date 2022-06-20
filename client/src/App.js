import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';
//import OrderForm from './OrderForm';
import Login from './Login';
import Register from './Register';
import UserForm from './UserForm';
import Search from './Search';
//import PostBox from './Components/PostBox';
import Account from './Page/Account';
import CoinStatus from './Page/CoinStatus';
import QAMain from './Page/QAMain';
import QAPost from './Components/QAPost';
import QAQuestion from './Page/QAQuestion';

import {getUser} from './graphql/queries';
import {getLoggedInUser, logout} from './auth';
import {AppContext, defaultContext} from './AppContext';

class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      userId: getLoggedInUser(),
      user:null
    };
  }

  handleLogout() {
    logout();
    this.setState({
      userId: null, 
      user:null
    });
  }


  async componentDidMount() {
    if(this.state.userId){
      console.log("componentDidMount: userId:"+this.state.userId)
      let user = await getUser(this.state.userId);
      user = {
        ...user,
        userId : this.state.userId
      }
      this.setState({user});

      console.log("componentDidMount:user:"+user);
    }
  }

  async onLogin(userId){

    let user = await getUser(userId);
	  this.setState({user, userId});
  }

  render() {
    if(AppContext===undefined) return("");

    const context = {
      EThProvider:defaultContext.EthProvider, 
      EThSigner:defaultContext.EthSigner,
      multiERC20Contract:defaultContext.multiERC20Contract,
      user: this.state.user
    }
    return (
      <AppContext.Provider value={context}>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/user"> Hi! {this.state.userId}</Nav.Link>
                { this.state.userId ?
                    <Button id="logout-btn" variant="primary" onClick={this.handleLogout.bind(this)}>Logout</Button>
                  :
                    <Link to="/login" id="login-page">Login</Link>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
                
        {(this.state.user)? 
        <div>
          <Routes>
            <Route path="/" exact element={<Account userId={this.state.userId}/>} />
            <Route path="search" exact element={<Search userId={this.state.userId}/>} />
            <Route path='login' element={<Login onLogin={this.onLogin.bind(this)}/>} />
            <Route path='register' element={<Register/>} />
            <Route path='user' element={<UserForm userId={this.state.userId}/>} />
            <Route path='coin' element={<CoinStatus user={this.state.user} />} />
            <Route path='qanew' element={<QAPost user={this.state.user} />} />
            <Route path='qamine' element={<QAMain user={this.state.user} />} />
            <Route path='qamain' element={<QAMain user={this.state.user} />} />
            <Route path='qaquestion/:id' element={<QAQuestion user={this.state.user} />} />
          </Routes>
        </div>
        : 
        <div>
          <Routes>
            <Route path="/" exact element={<Account userId={this.state.userId}/>} />
            <Route path='login' element={<Login onLogin={this.onLogin.bind(this)}/>} />
            <Route path='register' element={<Register/>} />
          </Routes>
        </div>
        }
      </div>
      </AppContext.Provider>
    );
  }
}

export default App;
