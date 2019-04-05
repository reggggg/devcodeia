import React, {Component} from 'react';
import {
  ModalHeader,
  ModalBody,
  Alert
} from 'reactstrap';

import FacebookLogin from 'react-facebook-login';

import history from '../../js/history';
import Config from '../../js/config';
import { createApolloFetch } from 'apollo-fetch';

import '../../css/authentication/Login.css';

let uri = Config.api;
let apolloFetch = createApolloFetch({ uri });

//AIzaSyBlKuXDCW2BfU7JdSPcB6hfkj_P9vtMpi4 -google api key
class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      facebookAuthText: 'Login with Facebook',
      facebookAuthDisable: false,
      fbAutoLoad: false,
      alertVisible: false,
      alertType: '',
      alertMessage: '',
      loginSubmitDisable: false,
      loginSubmitValue: 'LOGIN'
    }
  }

  alertToggle = () => {
    this.setState({
      alertVisible: false
    });
  }


  loginModalToggle = () => {
    this.props.toggleLoginModal(false);
  }

  loginOnEnter = e => {
    if(e.key === "Enter"){
      this.validateFormLogin();
    }
  }

  loginOnChange = async e => {
    await this.setState({
      [e.target.name] : e.target.value,
      alertVisible: false
    });
  }

  validateFormLogin = () => {
    const {
      email,
      password
    } = this.state;
    if(!email){
      this.setState({
        alertVisible: true,
        alertType: 'danger',
        alertMessage: 'Your email is required!'
      });
    }else if(!password){
      this.setState({
        alertVisible: true,
        alertType: 'danger',
        alertMessage: 'Your password is required!'
      });
    }else {
      this.setState({
        loginSubmitDisable: true,
        loginSubmitValue: 'LOGGING IN...'
      });
      this.loginNow();
    }
  }

  loginNow = () => {
    let query = 'query($varis:argsCheckUserType){checkUserEmail(input:$varis){data{token avatar id email firstname lastname} success message}}';
    let variables = {
      varis: {
        email: this.state.email,
        password: this.state.password
      }
    };
    apolloFetch({ query, variables }).then((response) => {
      console.log(response);
      let success = response.data.checkUserEmail.success;
      let errorMsg = response.data.checkUserEmail.message;
      if(success === true){
        let token = response.data.checkUserEmail.data[0].token;
        let id = response.data.checkUserEmail.data[0].id;
        this.props.toggleLoginModal(false);
        localStorage.setItem('NormalAuthSession', JSON.stringify({
          token: token,
          id: id
        }));
        window.location.reload();
      }else {
        this.setState({
          alertVisible: true,
          alertType: 'danger',
          alertMessage: errorMsg,
          loginSubmitDisable: false,
          loginSubmitValue: 'LOGIN'
        });
        this.clearPassword();
      }
    })
  }

  clearPassword = () => {
    this.setState({ password: ' '});
    this.refs.refPassword.value = '';
  }
  clearEmail = () => {
    this.setState({ email: ' '});
    this.refs.refEmail.value = '';
  }

  goToRegister = () => {
    this.loginModalToggle();
    history.push('/register');
  }

  goToForgotPassword = async () => {
    await this.loginModalToggle();
    history.push('/forgotPassword');
  }

  responseFacebook = async (res) => {
    this.setState({
      facebookAuthText: 'Connecting as ' + res.name + '...',
      facebookAuthDisable: true
    });
    console.log(res);
    let query = 'query($varis:createUserType){facebookLogin(input:$varis){data{token avatar id email firstname lastname}success message}}';
    let variables = {
      varis: {
        email: res.email,
        firstname: res.name,
        lastname: '',
        avatar: res.picture.data.url,
        password: res.userID
      }
    };
    apolloFetch({ query, variables }).then((response) => {
      console.log(response);
      let success = response.data.facebookLogin.success;
      let token = response.data.facebookLogin.data[0].token;
      let id = response.data.facebookLogin.data[0].id;
      if(success === true){
        localStorage.setItem('FacebookAuthSession', JSON.stringify({
          token: token,
          id: id
        }));
        window.location.reload();
      }else {
        this.setState({
          alertVisible: true,
          alertType: 'danger',
          alertMessage: 'Error: Network Failure!',
          facebookAuthText: 'Login with Facebook',
          facebookAuthDisable: false,
        });
      }
    });
  }



  render(){
    return (
      <div className="login">
        <div className="loginContent">
          <ModalHeader className="loginModalHeader" toggle={this.loginModalToggle}>
            <span>
              <p>Login to your account</p>
            </span>
          </ModalHeader>
          <ModalBody className="loginModalBody">
            <div className="loginForm">
              <Alert color={this.state.alertType}
                     isOpen={this.state.alertVisible}
                     toggle={this.alertToggle}
                     className="loginAlert">
                {this.state.alertMessage}
              </Alert>
              <label>Email</label>
              <input type="email"
                     placeholder="Email"
                     name="email"
                     ref="refEmail"
                     onChange={this.loginOnChange}
              />
              <label>Password</label>
              <input type="password"
                     placeholder="Password"
                     name="password"
                     ref="refPassword"
                     onKeyPress={this.loginOnEnter}
                     onChange={this.loginOnChange}
              />
              <h6 onClick={this.goToForgotPassword}>Forgot Password?</h6>
              <button className="loginSubmit"
                    onClick={this.validateFormLogin}
                    disabled={this.state.loginSubmitDisable}>
                {this.state.loginSubmitValue}
              </button>
            </div>


            <div className="registerArea">
              <p>Don’t have an account? Register now for FREE!</p>
              <button onClick={this.goToRegister}>REGISTER</button>
            </div>

            {/* <div className="medias">
              <FacebookLogin
                textButton={this.state.facebookAuthText}
                cssClass="fbLoginButton"
                appId="310980649560006"
                autoLoad={this.state.fbAutoLoad}
                fields="name,email,picture"
                callback={this.responseFacebook}
                isDisabled={this.state.facebookAuthDisable}
              />
            </div> */}
          </ModalBody>
        </div>
      </div>
    );
  }
}
export default Login;
