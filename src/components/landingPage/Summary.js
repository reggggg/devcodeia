import React, {Component} from 'react';
import { Container, Col, Row } from 'reactstrap';

import '../../css/landingPage/Summary.css';

class Summary extends Component {


  goToAbout = () => {
    document.getElementById('about').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToPortfolio = () => {
    document.getElementById('portfolio').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToClients = () => {
    document.getElementById('clients').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToContactUs = () => {
    document.getElementById('contactUs').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToMap = () => {
    document.getElementById('location').scrollIntoView({
      behavior: 'smooth'
    });
  }

  render(){
    const media = [
      {icon: require('../../images/icon-Fb-Active.svg'), title: '@codeiabusiness'},
      // {icon: require('../../images/icon-TelegramActive.svg'), title: '@codeiaph'},
      {icon: require('../../images/icon-Google+Active.svg'), title: 'codeia.tech@gmail.com'},
      {icon: require('../../images/icon-linkedinActive.svg'), title: 'Codeia Business Solutions'},
    ]

    const links = [
      {link: 'Home', func: () => window.location.reload()},
      {link: 'About', func: this.goToAbout},
      {link: 'Portfolio', func: this.goToPortFolio},
      {link: 'Clients', func: this.goToClients},
      {link: 'Contact', func: this.goToContactUs},
      {link: 'Site Map', func: this.goToMap},
    ]

    const services = [
      {link: 'UI/UX Design'},
      {link: 'JQuery'},
      {link: 'Java'},
      {link: '.Net'},
      {link: 'WordPress'},
      {link: 'Social Media'},
    ]

    const galleryImages = [
      {img: require('../../images/img-Gallery1.png')},
      {img: require('../../images/img-Gallery2.png')},
      {img: require('../../images/img-Gallery3.png')},
      {img: require('../../images/img-Gallery4.png')}
    ]

    return (
      <div className="summary">
        <Container>
          <Row className="summaryContent">
            <Col lg="6" className="left">
              <div className="titleBar">
                <img src={require('../../images/showcaseBannerLogo.svg')} alt=""/>
                <p>A web developer, marketer, and designer for the price of one.</p>
              </div>
              <div className="media">
                <ul>
                  <h3>Follow us at:</h3>
                  {
                    media.map(( item, index ) => (
                      <li key={index} className="eachMedia">
                        <img src={item.icon} alt="" />
                        <h6>{item.title}</h6>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </Col>
            <Col lg="6" className="right">
              <Row className="redirects">
                <Col sm="4" className="summaryLinks">
                  <h4>Links</h4>
                  {
                    links.map(( item, index ) => (
                      <div className="eachLinks" key={index}>
                        ><label onClick={item.func}>{item.link}</label>
                      </div>
                    ))
                  }
                </Col>
                <Col sm="4" className="summaryServices">
                  <h4>Services</h4>
                  {
                    services.map(( item, index ) => (
                      <div className="eachServices" key={index}>
                        <label>{item.link}</label>
                      </div>
                    ))
                  }
                </Col>
                <Col sm="4" className="summaryGallery">
                  <h4>Gallery</h4>
                  {
                    galleryImages.map(( item, index ) => (
                      <img className="eachImage"
                           key={index}
                           src={item.img}
                           alt=""
                      />
                    ))
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Summary;
