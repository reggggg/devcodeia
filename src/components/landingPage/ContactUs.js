import React, {Component} from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';

import { createApolloFetch } from 'apollo-fetch';
import Config from '../../js/config';

import '../../css/landingPage/ContactUs.css';

let uri = Config.api;
const apolloFetch = createApolloFetch({ uri });

class ContactUs extends Component {

  constructor(props){
    super(props);
    this.state = {
      alertVisible: false,
      alertType: '',
      alertMessage: '',
      submitValue: 'Send Message',
      submitDisable: false
    }
  }

  alertToggle = () => {
    this.setState({
      alertVisible: !this.state.alertVisible
    });
  }

  formOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  validateForms = () => {
    const {
      name,
      email,
      mobile,
      subject,
      message
    } = this.state;

    if(!name || !email || !mobile || !subject || !message){
      this.setState({
        alertVisible: true,
        alertType: 'danger',
        alertMessage: 'All fields are required!'
      });
    }else {
      this.setState({
        submitValue: 'Sending...',
        submitDisable: true
      });
      this.submitForm();
    }
  }

  submitForm = () => {
    let query = 'mutation($varis:contactInput){createContact(input:$varis){success}}';
    let variables = {
      varis: {
        name: this.state.name,
        mobile: this.state.mobile,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message
      }
    };
    apolloFetch({ query, variables }).then((response) => {
      console.log(response.data);
      let success = response.data.createContact.success;
      if(success === true){
        this.setState({
          alertVisible: true,
          alertType: 'success',
          alertMessage: 'Thank you for sending your feedback!',
          submitValue: 'Send Message',
          submitDisable: false
        });
        this.clearForm();
      }else {
        this.setState({
          alertVisible: true,
          alertType: 'danger',
          alertMessage: 'Error 500: Internal Server Error!',
          submitValue: 'Send Message',
          submitDisable: false
        });
        this.clearForm();
      }
    })

    // this.setState({
    //   alertVisible: true,
    //   alertType: 'warning',
    //   alertMessage: 'Currenly working with the API. Sorry for the inconvinience.',
    //   submitValue: 'Send Message',
    //   submitDisable: false
    // });
    // this.clearForm();
  }

  clearForm = () => {
    this.setState({
      name: '',
      email: '',
      mobile: '',
      subject: '',
      message: '',
    });
    this.refs.nameRef.value = '';
    this.refs.emailRef.value = '';
    this.refs.mobileRef.value = '';
    this.refs.subjectRef.value = '';
    this.refs.messageRef.value = '';
  }

  render(){

    const contactData = [
      {icon: require('../../images/icon-Location.svg'), title: 'Our Location', desc: 'PBCOM Tower Ayala Avenue, Makati City'},
      {icon: require('../../images/icon-Phone.svg'), title: 'Let\'s Talk', desc: '+63 945 210 6218'},
      {icon: require('../../images/icon-email.svg'), title: 'Email Us', desc: 'codeia.tech@gmail.com'},
    ]

    return (
      <div className="contactUs" id="contactUs">
        <Container>
          <div className="contactUsContent">
            <div className="titleBar">
              <span>Get in touch with us</span>
              <h2>Contact us</h2>
            </div>
            <Row className="contactBody">
              <Col md="6" className="left" data-aos="fade-right" data-aos-duration={1000}>
                {
                  contactData.map(( item, index ) => (
                    <div key={index} className="eachInfo">
                      <span>
                        <img src={item.icon} alt=""/>
                        <h3>{item.title}</h3>
                      </span>
                      <p>{item.desc}</p>
                    </div>
                  ))
                }
              </Col>
              <Col md="6" className="right" data-aos="fade-left" data-aos-duration={1000}>
                <div className="forms">
                  <Alert className="formsAlert" color={this.state.alertType} isOpen={this.state.alertVisible} toggle={this.alertToggle}>
                    {this.state.alertMessage}
                  </Alert>
                  <Row>
                    <Col lg="6">
                      <input type="text"
                             placeholder="Your name..."
                             className="formName"
                             name="name"
                             ref="nameRef"
                             maxLength="30"
                             onChange={this.formOnChange}
                      />
                      <input type="email"
                             placeholder="Your email..."
                             className="formEmail"
                             name="email"
                             ref="emailRef"
                             maxLength="50"
                             onChange={this.formOnChange}
                      />
                    </Col>
                    <Col lg="6">
                      <input type="text"
                             placeholder="Mobile number..."
                             className="formMobile"
                             name="mobile"
                             ref="mobileRef"
                             maxLength="11"
                             onChange={this.formOnChange}
                      />
                      <input type="text"
                             placeholder="Subject..."
                             className="formSubject"
                             name="subject"
                             ref="subjectRef"
                             maxLength="40"
                             onChange={this.formOnChange}
                      />
                    </Col>
                  </Row>
                  <textarea placeholder="Your message..."
                            cols="30" rows="8"
                            className="formMessage"
                            name="message"
                            ref="messageRef"
                            onChange={this.formOnChange}

                  />
                  <button onClick={this.validateForms}
                          className="submitMessage"
                          disabled={this.state.submitDisable}>
                    {this.state.submitValue}
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
export default ContactUs;
