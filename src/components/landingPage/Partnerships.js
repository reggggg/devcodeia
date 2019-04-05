import React, {Component} from 'react';
import { Container } from 'reactstrap';

import '../../css/landingPage/Partnerships.css';

class Partnerships extends Component {
  render(){

    const partners = [
      {img: require('../../images/client4.png')},
      {img: require('../../images/client3.png')},
      {img: require('../../images/client2.png')},
      {img: require('../../images/client1.png')},
    ]

    return (
      <div className="partnerships">
        <Container>
          <center className="partnershipsContent">
            {
              partners.map(( item, index ) => (
                <ul key={index} className="eachPartners">
                  <li><img src={item.img} alt="" /></li>
                </ul>
              ))
            }
          </center>
        </Container>
      </div>
    );
  }
}
export default Partnerships;
