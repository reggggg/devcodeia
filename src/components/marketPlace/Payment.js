import React, {Component} from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../../css/marketPlace/Payment.css';

class Payment extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalPrice: 0,
      pricesArray: [],
      countrySelected: 'Select Country *',
      regionSelected: 'Select Region *',
      regionsShown: [],
      dropdownCountry: false,
      dropdownRegion: false,
      openConfirmationModal: false,
      alertOpen: false,
      alertType: '',
      alertMessage: '',
      templatesInCart: [],
      templatesInCartResult: [],
    }
  }

  componentWillMount(){
    this.setState({
      templatesInCart: [
        {
          img: require('../../images/market/img-ImageIcon.png'),
          name: 'Codeia',
          creator: 'Lester and Friends',
          price: 15.50,
          plugins: ['React', 'Redux', 'Material UI', 'Material Design', 'Reactstrap', 'Bootstrap', 'Flat Design']
        },
        {
          img: require('../../images/market/img-ImageIcon.png'),
          name: 'Athena KYC',
          creator: 'Lester and Friends',
          price: 42.00,
          plugins: ['React', 'Redux', 'Material UI', 'Material Design', 'Reactstrap', 'Bootstrap', 'Flat Design']
        },
        {
          img: require('../../images/market/img-ImageIcon.png'),
          name: 'Dream ICO',
          creator: 'Lester and Friends',
          price: 32.99,
          plugins: ['React', 'Redux', 'Material UI', 'Material Design', 'Reactstrap', 'Bootstrap', 'Flat Design']
        },
        {
          img: require('../../images/market/img-ImageIcon.png'),
          name: 'VPN Cash',
          creator: 'Lester and Friends',
          price: 54.99,
          plugins: ['React', 'Redux', 'Material UI', 'Material Design', 'Reactstrap', 'Bootstrap', 'Flat Design']
        },
      ]
    })
  }
  async componentDidMount() {
    await this.addAllPrices();
  }

  addAllPrices = () => {
    this.state.templatesInCart.map(( item, index ) => {
      this.state.pricesArray.push(this.state.templatesInCart[index].price)
    })
    this.reducePricesIntoSum(this.state.pricesArray);
  }
  reducePricesIntoSum = async (prices) => {
    await this.setState({
      totalPrice: prices.reduce((a, b) => a + b, 0)
    });
    console.log(this.state.totalPrice);
  }

  toggleDropdownCountry = () => {
    this.setState({
      dropdownCountry: !this.state.dropdownCountry
    });
  }
  toggleDropdownRegion = () => {
    if(this.state.countrySelected === 'Select Country *'){

    }else {
      this.setState({
        dropdownRegion: !this.state.dropdownRegion
      });

    }
  }

  selectCountry = async (e) => {
    await this.setState({
      countrySelected: e.country,
      regionsShown: e.regions
    });
  }
  selectRegion = async (e) => {
    await this.setState({
      regionSelected: e,
    });
  }

  paymentOnChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEnter = async (e) => {
    if(e.key === 'Enter'){
      this.formValidate();
    }
  }

  toggleAlert = () => {
    this.setState({
      alertOpen: false
    });
  }

  formValidate = () => {
    const {
      firstName,
      lastName,
      cardNumber,
      cscCode,
      cscMonth,
      cscYear,
      streetAddress,
      city,
      countrySelected,
      regionSelected,
      year
    } = this.state;
    if(!firstName || !lastName || !cardNumber || !cscCode || !cscMonth || !cscYear || !streetAddress || !city || !countrySelected || !regionSelected || !year){
      this.setState({
        alertOpen: true,
        alertType: 'danger',
        alertMessage: 'All fields are required!'
      });
    }
    else {
      this.proceedTransaction();
    }
  }
  proceedTransaction = () => {
    this.setState({
      openConfirmationModal: !this.state.openConfirmationModal
    });
  }
  confirmationCancel = () => {
    this.setState({
      openConfirmationModal: false
    });
  }
  removeTemplate = async (e) => {
    this.state.templatesInCart.splice(e, 1);
    await this.setState({
      templatesInCart: this.state.templatesInCart,
      pricesArray: []
    });
    this.addAllPrices();
  }

  payNow = () => {

  }


  render(){
  const countriesAndRegions = [
    {
      country: 'Philippines',
      regions: [
        'Region IV-A',
        'Calabarzon',
        'MIMAROPA'
      ]
    },
    {
      country: 'China',
      regions: [
        'Guangxi',
        'Inner Mongolia',
        'Tibet',
        'Ningxia',
        'Xinjiang'
      ]
    },
    {
      country: 'Singapore',
      regions: [
        'Central Region',
        'North Region',
        'North-East Region',
        'East Region'
      ]
    },
    {
      country: 'Japan',
      regions: [
        'Hokaido',
        'Kansai',
        'Shikoku'
      ]
    },
  ];

  let shoppingCartTemplates;
  if(this.state.templatesInCart.length === 0){
    shoppingCartTemplates =
    <div className="shoppingCart">
      <label>Shopping Cart </label>
      <hr/>
      <p>You currently have no items in your cart. Let's add some items.</p>
      <div className="backToMarket">
        <Link to="/">Back to the Codeia Market Place</Link>
      </div>
    </div>
  }else {
    shoppingCartTemplates =
    <div>
      <div className="templatesInCart">
        <label className="checkAll">Select All</label>
        {
          this.state.templatesInCart.map(( item, index ) => (
            <div key={index} className="eachCard">
              <div className="templateCheckboxDiv">
                <span className="templateCheckbox">
                  <img src={require('../../images/checked.svg')} alt=""/>
                </span>
              </div>
              <div className="eachTemplate">
                <div className="imageDiv">
                  <img src={item.img} alt="" />
                </div>
                <div className="desc">
                  <div className="nameAndPrice">
                    <h5>{item.name}</h5>
                    <div className="price">
                        $<label>{parseFloat(item.price).toFixed(2)}</label>
                    </div>
                  </div>
                  <h6>by {item.creator}</h6>
                  <p>{item.plugins.join(', ')}</p>
                  <div className="removeTemplate">
                    <label onClick={() => this.removeTemplate(index)}>remove</label>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="forms">
        <label>Payment Method</label>
        <hr/>
        <div className="inputs">
          <Alert className="paymentAlert" color={this.state.alertType} isOpen={this.state.alertOpen} toggle={this.toggleAlert}>
            {this.state.alertMessage}
          </Alert>
          <input type="text"
                 placeholder="First name *"
                 name="firstName"
                 onChange={this.paymentOnChange}
          />
          <input type="text"
                 placeholder="Last name *"
                 name="lastName"
                 onChange={this.paymentOnChange}
          />
          <input type="text"
                 placeholder="Card Number *"
                 name="cardNumber"
                 onChange={this.paymentOnChange}
          />
          <Row>
            <Col md="5">
              <input type="text"
                     placeholder="CSC Code *"
                     name="cscCode"
                     onChange={this.paymentOnChange}
              />
            </Col>
            <Col md="5">
              <input type="text"
                     placeholder="Month *"
                     maxLength="15"
                     name="cscMonth"
                     onChange={this.paymentOnChange}
              />
            </Col>
            <Col md="2">
              <input type="text"
                     placeholder="Year *"
                     maxLength="4"
                     name="cscYear"
                     onChange={this.paymentOnChange}
              />
            </Col>
          </Row>
          <input type="text"
                 placeholder="Street Address *"
                 maxLength="4"
                 name="streetAddress"
                 onChange={this.paymentOnChange}
          />
          <input type="text"
                 placeholder="City *"
                 maxLength="4"
                 name="city"
                 onChange={this.paymentOnChange}
          />
          <Row>
            <Col md="5">
              <Dropdown className="formDropdown" isOpen={this.state.dropdownCountry} toggle={this.toggleDropdownCountry}>
                <DropdownToggle className="formDropdownButton" caret>
                  {this.state.countrySelected}
                </DropdownToggle>
                <DropdownMenu className="formDropdownMenu">
                  {
                    countriesAndRegions.map(( item, index ) => (
                      <DropdownItem key={index}
                                    className="formDropdownItem"
                                    onClick={() => this.selectCountry(item)}>
                        {item.country}
                      </DropdownItem>
                    ))
                  }
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md="5">
              <Dropdown className="formDropdown" isOpen={this.state.dropdownRegion} toggle={this.toggleDropdownRegion}>
                <DropdownToggle className="formDropdownButton" caret>
                  {this.state.regionSelected}
                </DropdownToggle>
                <DropdownMenu className="formDropdownMenu">
                  {
                    this.state.regionsShown.map(( item, index ) => (
                      <DropdownItem key={index}
                                    className="formDropdownItem"
                                    onClick={() => this.selectRegion(item)}>
                        {item}
                      </DropdownItem>
                    ))
                  }
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md="2">
              <input type="text"
                     placeholder="Year *"
                     maxLength="4"
                     name="year"
                     onKeyPress={this.onEnter}
                     onChange={this.paymentOnChange}
              />
            </Col>
          </Row>
        </div>
        <div className="terms">
          <p>
            By clicking "Process Payment", you agree to Mojo's <b>Terms of Service</b> and <b>Cancellation Policy</b> and acknowledge receipt of our <b>Privacy Policy</b>.
          </p>
          <p>You also agree to have your personal information transferred and stored in the United States, which is necessary to provide you with the services under our agreement with you.</p>
          <p>All Theme support automatically renews unless you cancel. The renewal will be for the same term length and at the regular rates reflected in the My Purchases section of your Marketplace account. The payment method you provide today, or that we have on file, will be used for renewals, unless you change it or cancel. To cancel please call customer support at 855-464-5345.</p>
        </div>
        <div className="processPayment">
          <button onClick={this.formValidate}>Process Payment</button>
        </div>
      </div>
    </div>
  }

    return (
      <div className="payment">
        <Container>
          <Row className="paymentContent">
            <Col lg="3" className="orders">
              <h4>Order Summary</h4>
              {
                this.state.templatesInCart.length === 0 ?
                <div className="orderSummaryEmpty">
                  ({this.state.templatesInCart.length}) templates in cart
                </div>
                :
                <div>
                  <ul>
                    {
                      this.state.templatesInCart.map(( item, index ) => (
                        <li key={index}>
                          <p>{`${index + 1} ) `}{item.name}</p>
                          <p>${parseFloat(item.price).toFixed(2)}</p>
                        </li>
                      ))
                    }
                  </ul>
                  <hr/>
                  <span>
                    <h5>Purchase Total: </h5>
                    <h5>
                      ${parseFloat(this.state.totalPrice).toFixed(2)}
                    </h5>
                  </span>
                  <button onClick={this.payNow}>Pay Now</button>
                </div>
              }
            </Col>
            <Col lg="9" className="right">
              {shoppingCartTemplates}
            </Col>
          </Row>

        </Container>
        <div className={this.state.openConfirmationModal ? 'paymentModal' : 'paymentModal hidden'}>
          <div className="paymentModalBody">
            <h4>Are you sure you want to proceed?</h4>
            <div className="tickButtons">
              <button className="yes">Yes</button>
              <button className="cancel" onClick={this.confirmationCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Payment;
