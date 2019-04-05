import React, {Component} from 'react';
import { Container } from 'reactstrap';

import history from '../../js/history';

import '../../css/landingPage/Showcase.css';

class Showcase extends Component {

  startNow = () => {
    history.push('/store');
  }

  render(){
    return (
      <div className="showcase">
        <Container>
          <center className="showcaseContent">
            <img src={require('../../images/showcaseBannerLogo.svg')} data-aos="zoom-in-up" data-aos-duration={1800} alt=""/>
            <h2 data-aos="fade-up" data-aos-duration={1500}>BUSINESS SOLUTIONS</h2>
            <div className="hrLine" data-aos="zoom-in" data-aos-duration={2500}></div>
            <p data-aos="zoom-in-down" data-aos-duration={1000}>
              <label>A Web Developer, Marketer, and Designer for the price of one.</label><br/>
              Hi! We are Codeia. We do web development, web design, graphics design, and marketing services. We also have website templates and codes you can easily use in your projects. We are your one-stop-shop for your business needs.
            </p>
            <button data-aos="zoom-out" data-aos-duration={1000} onClick={this.startNow}>START NOW</button>
          </center>
        </Container>
      </div>
    );
  }
}
export default Showcase;
