import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import history from '../../js/history';

import '../../css/landingPage/MarketPortal.css';

class MarketPortal extends Component {
  render(){
    return (
      <div className="marketPortal">
        <Container>
          <div className="marketPortalContent">
            <div className="titleBar">
              <h6>Build your projects</h6>
              <h4>Our Services</h4>
            </div>
            <Row className="flexBetween">
              <Col md="5" className="left" data-aos="fade-right" data-aos-duration={1000}>
                <div className="imgContainer">
                  <img src={require('../../images/codeia-LogoGreen.svg')} alt=""/>
                  <label>Market Place</label>
                </div>
                <h2>Codeia Market Place</h2>
                <p>Codeia Market Place is a collection of themed marketplaces, where creatives sell digital assets to help bring your ideas to life. Buy anything from Photoshop, Illustrator vectors and some video footages to advanced Marketing Designs and plugins as well.</p>
                <div><button onClick={() => history.push('/store')}>Go to Codeia Market</button></div>
              </Col>
              <Col md="2" className="middle">
                <div className="vr"></div>
              </Col>
              <Col md="5" className="right" data-aos="fade-left" data-aos-duration={1000}>
                <div className="imgContainer">
                  <img src={require('../../images/codeia-LogoGreen.svg')} alt=""/>
                  <label>Components</label>
                </div>
                <h2>Codeia Market Place</h2>
                <p>Codeia Market Place is a collection of themed marketplaces, where creatives sell digital assets to help bring your ideas to life. Buy anything from Photoshop, Illustrator vectors and some video footages to advanced Marketing Designs and plugins as well.</p>
                <div><button>Go to Codeia Components</button></div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
export default MarketPortal;
