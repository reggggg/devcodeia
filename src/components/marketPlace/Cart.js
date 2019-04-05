import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import history from '../../js/history';
import '../../css/marketPlace/Cart.css';

class Cart extends Component {
  render(){
    return (
      <div className="cart">
        <Container>
          <Row className="cartContent">
            <Col md="3" className="left">
              <span>
                <h6>Total (0 items): </h6>
                <h5>${parseFloat(0).toFixed(2)}</h5>
              </span>
            </Col>
            <Col md="9" className="right">
              <div className="shoppingCart">
                <label>Shopping Cart</label>
                <hr/>
                <p>You currently have no items in your cart. Let's add some items.</p>
                <h6 onClick={() => history.goBack()}>Back to the Codeia Market Place</h6>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Cart;
