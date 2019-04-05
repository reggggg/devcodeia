import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import StarRatings from 'react-star-ratings';

import history from '../../js/history';
import '../../css/marketPlace/ItemDetails.css';

import { FaCartPlus } from 'react-icons/fa'

class ItemDetails extends Component {
  constructor(){
    super();
    this.state = {
      itemRendering: false,
      itemDetail: {},
      modalPopup: false
    }
  }

  componentWillMount(){
    if(localStorage.getItem('PreviewTemplate')){
      this.setState({
        itemRendering: true
      });
    }else {
      history.replace('/');
    }
  }
  componentDidMount(){
    this.setState({
      itemDetail: JSON.parse(localStorage.getItem('PreviewTemplate')),
      itemRendering: false
    });
  }

  componentWillUnmount(){
    localStorage.removeItem('PreviewTemplate');
  }

  addToCart = () => {
    this.setState({
      modalPopup: !this.state.modalPopup
    });
  }


  render(){
    const {
      price,
      img,
      desc,
      rating,
      webname,
      linkweb,
      theme,
      sources,
    } = this.state.itemDetail;


    return (
      <div className="itemDetails">
        <Container>
          <Row className="itemDetailsContent">
            <Col md="3" className="left">
              <span className="pricing">
                <h6>Item Price (USD)</h6>
                <h5>${parseFloat(price).toFixed(2)}</h5>
              </span>
              <p>Theme support auto-renews yearly.*</p>
              <div className="buyNowDiv">
                <button onClick={this.addToCart}>ADD TO CART</button>
              </div>
              <span className="cardPurchase">
                <img src={require('../../images/cart/img-MasterCard.png')} alt=""/>
                <img src={require('../../images/cart/img-visa.png')} alt=""/>
                <img src={require('../../images/cart/img-payPal.png')} alt=""/>
                <img src={require('../../images/cart/img-discover.png')} alt=""/>
                <img src={require('../../images/cart/img-amEx.png')} alt=""/>
              </span>
            </Col>
            <Col md="9" className="right">
              {
                this.state.itemRendering ?
                <div className="itemDetails">
                  <div className="placeholder">
                    <div className="animated-background"></div>
                  </div>
                </div>
                :
                <div className="itemDetails">
                  <label>Item Details</label>
                  <hr/>
                  <div className="eachItem">
                    <StarRatings
                      rating={rating}
                      starRatedColor="#F8B71C"
                      numberOfStars={5}
                      name='rating'
                      starDimension="17px"
                      starSpacing="3px"
                    />
                    <img src={img} alt=""/>
                    <span className="buttonContainer">
                      <button className="buttonPreview" onClick={() => window.open(linkweb)}>LIVE PREVIEW</button>
                      <button className="buttonBuyNow" onClick={this.addToCart}>ADD TO CART</button>
                    </span>
                    <p>
                      <b>{webname} - </b>
                      {desc}
                    </p>
                    <h6>Theme Features</h6>
                    <ul>
                      {
                        theme.map(( item, index  ) => (
                          <li key={index}>- {item}</li>
                        ))
                      }
                    </ul>
                    <h6>Sources & Credits</h6>
                    <ul>
                      {
                        sources.map(( item, index ) => (
                          <li key={index}>- {item}</li>
                        ))
                      }
                    </ul>
                    <CSSTransition
                      in={this.state.modalPopup}
                      timeout={300}
                      classNames="alert"
                      unmountOnExit
                      >
                        <div className="addToCartAlert">
                          <div className="addToCartAlertBody">
                            <FaCartPlus />
                            <h4>Added '{webname}' to cart!</h4>
                            <div className="tickButtons">
                              <button className="cancel" onClick={this.addToCart}>Close</button>
                            </div>
                          </div>
                        </div>
                    </CSSTransition>
                  </div>
                </div>
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ItemDetails;
