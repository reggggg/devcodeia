import React, {Component} from 'react';
import { Container, Row, Col, Modal, Alert  } from 'reactstrap';
import ReCAPTCHA from 'react-google-recaptcha';

import Config from '../../js/config';
import history from '../../js/history';
import { createApolloFetch } from 'apollo-fetch';

import LoginModal from './Login';

import '../../css/authentication/Register.css';

let uri = Config.api;
let apolloFetch = createApolloFetch({ uri });

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      loginModal: false,
      recaptchaValue: '',
      alertVisible: false,
      alertType: '',
      alertMessage: ''
    }
  }

  componentWillMount(){
    if(localStorage.getItem('NormalAuthSession')){
      history.push('/');
    }
  }

  registerOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEnter = async e  => {
    if(e.key === 'Enter'){
      await this.validateForm();
    }
  }

  validateForm = () => {
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword
    } = this.state;

    if(!email && !firstName && !lastName && !password && !confirmPassword){
      this.setState({
        alertVisible: true,
        alertType: 'danger',
        alertMessage: 'All fields are required!'
      });
    }else if(!email){
      this.setState({
        alertVisible: true,
        alertType: 'danger',
        alertMessage: 'Email is required!'
      });
    }else if(password !== confirmPassword){
      this.setState({
        alertVisible: true,
        alertType: 'danger',
        alertMessage: 'Password and confirm password must be the same!'
      });
      this.clearEmailAndPasswordOnly();
    }else if(!this.state.recaptchaValue){
      this.setState({
        alertVisible: true,
        alertType: 'danger',
        alertMessage: 'Please confirm you are not a robot!'
      });
    }else{
      this.registerSubmit();
      this.clearForm();
    }
  }

  registerSubmit = () => {
    let query = 'mutation($varis:createUserType){createUser(input:$varis){success message}}';
    let variables = {
      varis: {
        email: this.state.email,
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        avatar: '',
        password: this.state.password
      }
    };
    apolloFetch({ query, variables }).then((response) => {
      let success = response.data.createUser.success;
      if(success === true){
        this.setState({
          alertVisible: true,
          alertType: 'success',
          alertMessage: 'Successfully registered! You can now login...'
        });
      }else {
        this.setState({
          alertVisible: true,
          alertType: 'danger',
          alertMessage: 'Error: Network Failure!'
        });
      }
    });
  }

  clearForm = () => {
    this.setState({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    });
    this.refs.emailRef.value = '';
    this.refs.firstNameRef.value = '';
    this.refs.lastNameRef.value = '';
    this.refs.passwordRef.value = '';
    this.refs.confirmPasswordRef.value = '';
  }

  clearEmailAndPasswordOnly = () => {
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
    });
    this.refs.emailRef.value = '';
    this.refs.passwordRef.value = '';
    this.refs.confirmPasswordRef.value = '';
  }

  reCaptchaOnChange = (value) => {
    this.setState({
      recaptchaValue: value
    });
  }

  loginModalToggle = () => {
    this.setState({
      loginModal: !this.state.loginModal
    });
  }

  loginModalToggleFromRegister = async (e) => {
    await this.setState({
      loginModal: e
    });
  }

  alertToggle = () => {
    this.setState({
      alertVisible: false
    });
  }


  render(){
    return (
      <div className="register">
        <Container>
          <Row className="registerContent">
            <Col md="3" className="goToLoginCard">
              <h3>Already have an account?</h3>
              <button onClick={this.loginModalToggle}>LOGIN</button>
            </Col>
            <Col md="8" className="registerForm">
              <label>Create your free account now</label>
              <hr />
              <Alert color={this.state.alertType}
                     isOpen={this.state.alertVisible}
                     toggle={this.alertToggle}
                     className="registerAlert">
                {this.state.alertMessage}
              </Alert>
              <div className="formInputs">
                <input type="text"
                       placeholder="Email"
                       name="email"
                       ref="emailRef"
                       onChange={this.registerOnChange}
                />
                <input type="text"
                       placeholder="First name"
                       name="firstName"
                       ref="firstNameRef"
                       onChange={this.registerOnChange}
                />
                <input type="text"
                       placeholder="Last name"
                       name="lastName"
                       ref="lastNameRef"
                       onChange={this.registerOnChange}
                />
                <input type="password"
                       placeholder="Password"
                       name="password"
                       ref="passwordRef"
                       onChange={this.registerOnChange}
                />
                <input type="password"
                       placeholder="Confirm Password"
                       name="confirmPassword"
                       ref="confirmPasswordRef"
                       onChange={this.registerOnChange}
                       onKeyPress={this.onEnter}
                />
              </div>

              <div className="robotAuth">
                {/* Google robot auth */}
                <ReCAPTCHA
                  sitekey="6LdaI5MUAAAAAMEuAEhT7Xr2SM6baMNvciL3TNcU"
                  onChange={this.reCaptchaOnChange}
                  className="recaptcha"
                />
              </div>

              <div className="terms">
                <h6>By registering here at codeia, you accept our <b>Terms of use</b> and acknowldedge receipt of our <b>Privacy policy</b>.</h6>
                <p>You also agree to have your personal information transferred and stored in the United States, which is necessary to provide you with the services under our agreement with you.</p>
              </div>

              <div className="submitButton">
                <button onClick={this.validateForm}>REGISTER</button>
              </div>
            </Col>
          </Row>
          <Modal className="loginModalContent" isOpen={this.state.loginModal} size="md">
            <LoginModal toggleLoginModal={this.loginModalToggleFromRegister} />
          </Modal>
        </Container>
      </div>
    );
  }
}
export default Register;
