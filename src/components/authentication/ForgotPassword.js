import React, {Component} from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import history from '../../js/history';

import '../../css/authentication/ForgotPassword.css';

class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      email: 'sample@gmail.com'
    }
  }

  formOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEnter = e => {
    if(e.key === 'Enter'){
      this.sendForgotPassword();
    }
  }

  sendForgotPassword = () => {
    //validations
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(){
    return (
      <div className="forgotPassword">
        <Container>
          <Row className="forgotPasswordContent">
            <Col md="3" className="left">
              <h5>Don't have an account?</h5>
              <button onClick={() => history.push('/register')}>SIGN UP</button>
            </Col>
            <Col md="9" className="right">
              <div className="formBody">
                <label>Forgot Password?</label>
                <hr/>
                <p>Enter your email to receive a password reset link.</p>
                <input type="text"
                       placeholder="Account email address"
                       name="email"
                       onKeyPress={this.onEnter}
                       onChange={this.formOnChange}
                />
                <div>
                  <button onClick={this.sendForgotPassword}>RESET PASSWORD</button>
                </div>
              </div>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalHeader className="forgotPasswordModalHeader" toggle={this.toggleModal}>
              <label>Account Password Reset</label>
            </ModalHeader>
            <ModalBody className="forgotPasswordModalBody">
              <p>
                An email has been sent to <strong>{this.state.email}</strong> successfully. Please login to your email and
                follow the instructions for account verification.
              </p>
              <hr />
              <button>LOGIN</button>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    );
  }
}
export default ForgotPassword;
