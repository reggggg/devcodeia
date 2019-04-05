import React, {Component} from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Modal,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import LoginModal from './authentication/Login';
import history from '../js/history';
import Config from '../js/config';
import { createApolloFetch } from 'apollo-fetch';

import '../css/MarketHeader.css';

import { FaHeart, FaShoppingCart } from 'react-icons/fa';


let uri = Config.api;
let apolloFetch = createApolloFetch({ uri });

class MarketHeader extends Component {

  constructor(props){
    super(props);
    this.state = {
      loginModal: false,
      mobileViewIsOpen: false,
      isLoggedInViaFacebook: false,
      isLoggedInViaNormalLogin: false,
      facebookAuthData: {},
      normalLoginInfo: {},
      profileDropdownOpen: false
    }
  }

  async componentWillMount(){
    if(localStorage.getItem('NormalAuthSession')){
      const loggedId = JSON.parse(localStorage.getItem('NormalAuthSession')).id;
      let query = 'query ($input:argsIdType){inquireUser(input:$input){data {id email lastname firstname password createdat avatar} success}}';
      let variables = {
        input: {
          id: loggedId
        }
      };
      apolloFetch({ query, variables }).then((response) => {
        const success = response.data.inquireUser.success;
        const loginData = response.data.inquireUser.data[0];
        if(success === true){
          this.setState({
            normalLoginInfo: loginData,
            isLoggedInViaNormalLogin: true,
          });
        }
      })
    }
  }

  async componentDidMount(){
    if(localStorage.getItem('FacebookAuthSession')){
      const loggedId = JSON.parse(localStorage.getItem('FacebookAuthSession')).id;
      let query = 'query ($input:argsIdType){inquireUser(input:$input){data {id email lastname firstname password createdat avatar} success}}';
      let variables = {
        input: {
          id: loggedId
        }
      };
      apolloFetch({ query, variables }).then((response) => {
        const success = response.data.inquireUser.success;
        const facebookData = response.data.inquireUser.data[0];
        if(success === true){
          this.setState({
            facebookAuthData: facebookData,
            isLoggedInViaFacebook: true,
          });
        }
      })
    }
  }


  mobileViewToggle = () => {
    this.setState({
      mobileViewIsOpen: !this.state.mobileViewIsOpen
    });
  }

  loginModalToggle = async () => {
    await this.setState({
      loginModal: !this.state.loginModal
    });
  }

  loginModalToggleFromHeader = async (e) => {
    await this.setState({
      loginModal: e
    });
  }

  profileDropdownToggle = () => {
   this.setState({
     profileDropdownOpen: !this.state.profileDropdownOpen
   });
 }

 logout = () => {
   localStorage.clear();
   window.location.reload();
 }

 brandLogoClick = () => {
   // window.location.href = "https://codeia.net";
   history.push('/');
 }

  render(){

    let headerDisplay;
    // delete the ! after
    if(this.state.isLoggedInViaFacebook){
      headerDisplay =
      <div className="loggedInHeader">
        <span>
          <div className="headerOurServices">
            <h6>Our Services</h6>
          </div>
          <div className="cartLogo" onClick={() => history.push('/payment')}>
            <FaShoppingCart />
          </div>
          <Dropdown className="profileDropdown" isOpen={this.state.profileDropdownOpen} toggle={this.profileDropdownToggle}>
            <DropdownToggle className="profileDropdownButton">
              <img className="fbProfileImage" src={this.state.facebookAuthData.avatar} alt=""/>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.logout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </span>
      </div>
    }else if(this.state.isLoggedInViaNormalLogin){
      headerDisplay =
      <div className="loggedInHeader">
        <span>
          <div className="headerOurServices">
            <h6>Our Services</h6>
          </div>
          <Dropdown className="profileDropdown" isOpen={this.state.profileDropdownOpen} toggle={this.profileDropdownToggle}>
            <DropdownToggle className="profileDropdownButton">
              <img src={require('../images/nouser.png')} alt=""/>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Hi, {this.state.normalLoginInfo.firstname}</DropdownItem>
              <DropdownItem onClick={() => history.push('/profile')}>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Downloads</DropdownItem>
              <DropdownItem>Favorites</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.logout}>Sign out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="cartLogo" onClick={() => history.push('/payment')}>
            <FaShoppingCart />
          </div>
          <div className="cartLogo">
            <FaHeart />
          </div>
        </span>
      </div>
    }

    else {
      headerDisplay =
      <div className="headerDisplayBody">
        <div className="headerOurServices">
          <h6>Our Services</h6>
        </div>
        <div className="headerLoginRegister">
          <h6 onClick={this.loginModalToggle}>Login</h6>
          <h6 className="slash" disabled>&nbsp;/&nbsp; </h6>
          <h6 onClick={() => history.push('/register')}>Sign up</h6>
        </div>
        <div className="cartLogo" onClick={() => history.push('/payment')}>
          <FaShoppingCart />
        </div>
      </div>
    }



    return (
      <div className="marketHeader">
        <Navbar className="headerNav" expand="md">
          <Container>
            <NavbarBrand onClick={this.brandLogoClick}><img src={require('../images/market/logo-CodeiaDev-01.svg')} alt=""/></NavbarBrand>
            <NavbarToggler className={this.state.mobileViewIsOpen === true ? 'mobileViewActive' : ''} onClick={this.mobileViewToggle} />
            <Collapse className="marketHeaderCollapse" isOpen={this.state.mobileViewIsOpen} navbar>
              <Nav className="linksBody ml-auto" navbar>
                {headerDisplay}
              </Nav>
            </Collapse>
            <Modal className="loginModalContent" isOpen={this.state.loginModal} size="md">
              <LoginModal toggleLoginModal={this.loginModalToggleFromHeader} />
            </Modal>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default MarketHeader;
