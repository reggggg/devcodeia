import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../css/landingPage/About.css';

class About extends Component {
  render(){
    return (
      <div className="about" id="about">
        <Container>
          <Row className="aboutContent">
            <Col md="4" className="firstCol" data-aos="fade-right" data-aos-duration={1000}>
              <span>What we do</span>
              <h3>We build Design and Develop Websites</h3>
              <p>
                Do you remember the amazing idea you had while you were having a coffee before? Or the dream project you want to build while having drinks with your friends? Yes, those ideas - we can do them for you. So just chill with a coffee or beer in your hand, give us your idea and we will do all the work for you.
                <br/><br/>We do Web Design, Full-Stack Web Development, Graphic Designs and Digital Marketing. You can also buy more ready-made codes and website templates that you can easily download and use in your own project.

              </p>
              <button>Read more</button>
            </Col>
            <Col md="4" className="secondCol"></Col>
            <Col md="4" className="thirdCol" data-aos="fade-left" data-aos-duration={1000}>
              <span>Who we are</span>
              <h3>We are the Best Development Team you'll ever have</h3>
              <p>
                Hi! We are CODEIA, your partner in creating your dream project. We do Web Design, Web Development, Graphic Design and Digital Marketing.
                <br/><br/>CODEIA is a website that aims to help startups, small businesses and entrepreneurs to build their dream projects. We will be with you from planning to development, until the launching of your product.
              </p>
              <button>Get Quote</button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default About;
