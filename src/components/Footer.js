import React, {Component} from 'react';
import { Container } from 'reactstrap';

import '../css/Footer.css';

class Footer extends Component {
  render(){
    return (
      <div className="footer">
        <Container>
          <div className="footerContent">
            <p>2019 © All rights reserved by <a href="/">Codeia.com</a></p>
          </div>
        </Container>
      </div>
    );
  }
}
export default Footer;
