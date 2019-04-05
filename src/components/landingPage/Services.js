import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../css/landingPage/Services.css';

class Services extends Component {
  render(){

    const services = [
      {img: require('../../images/icon-BusinessSoln.svg'), title: 'Website Development', desc: 'We offer a complete package of Web Development Services. We do the UI Design, Web Development, Admin Panel and CMS.'},
      {img: require('../../images/icon-DigiMktg.svg'), title: 'Media and Marketing', desc: 'So you\'ve got your website, you\'ve got it up and running but you do not know any Graphic Design and Marketing? We\'re here to do it for you!'},
      {img: require('../../images/icon-WebDev.svg'), title: 'eCommerce', desc: 'You can buy templates and codes from us. You know that? Coding is really hard. So if you\'re kinda lazy but still want to build your own, buy templates and codes from us.'},
    ]
    return (
      <div className="services">
        <Container>
          <div className="servicesContent">
            <center className="titleBar">
              <span>Our Services</span>
              <h2>Welcome to Codeia for Digital Marketing & Services</h2>
            </center>
            <Row className="servicesBody">
              {
                services.map(( item, index ) => (
                  <Col md="4" key={index} className="servicesFrame" data-aos="zoom-out-up" data-aos-duration={1500}>
                    <img src={item.img} alt=""/>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </Col>
                ))
              }
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
export default Services;
