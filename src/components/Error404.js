import React, {Component} from 'react';
import { Container } from 'reactstrap';
import history from '../js/history';

import '../css/Error404.css';

class Error404 extends Component {
  render(){
    return (
      <div className="error404">
        <Container>
          <div className="head404">
            <img src={require('../images/error404/codeia-LogoText-white-01.svg')} alt=""/>
          </div>
          <div className="error404Content">
            <img src={require('../images/error404/icon-error404.svg')} alt=""/>
            <p>OOPS! PAGE NOT FOUND…</p>
            <button onClick={() => history.goBack()}>BACK</button>
          </div>
        </Container>
      </div>
    );
  }
}
export default Error404;
