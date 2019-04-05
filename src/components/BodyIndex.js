import React, {Component} from 'react';

import $ from 'jquery';

import Header from './Header';
import Showcase from './landingPage/Showcase';
import Services from './landingPage/Services';
import About from './landingPage/About';
import Portfolio from './landingPage/Portfolio';
import MarketPortal from './landingPage/MarketPortal';
import Clients from './landingPage/Clients';
import ContactUs from './landingPage/ContactUs';
import Partnerships from './landingPage/Partnerships';
import Location from './landingPage/Location';
import Summary from './landingPage/Summary';
import Footer from './Footer';

import AOS from 'aos';
import 'aos/dist/aos.css';


import '../css/BodyIndex.css';
import '../css/commons.css';

class BodyIndex extends Component {

  constructor(){
    super();
    this.state = {
      rendering: true
    }
  }


  async componentDidMount(){
    await this.setState({
      rendering: false
    });
    $('.bodyIndex button.floatingButton').fadeOut(0);
    $(window).scroll(function() {
      if ($(this).scrollTop() >= 800) {
        $('.bodyIndex button.floatingButton').fadeIn(500);
      }else {
        $('.bodyIndex button.floatingButton').fadeOut(500);
      }
    });
    AOS.init();
  }

  goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  render(){
    return (
      this.state.rendering ?
      <div className="bodyIndex">
        <Header />
        <div className="loaderDiv">
          <img src={require('../images/loading.gif')} alt=""/>
        </div>
      </div>
      :
      <div className="bodyIndex">
        <Header />
          <Showcase />
          <Services />
          <About />
          <Portfolio />
          <MarketPortal />
          <Clients />
          <ContactUs />
          <Partnerships />
          <Location />
          <Summary />
        <Footer />
        <button className="floatingButton" onClick={this.goToTop}>
          <img src={require('../images/arrow-up.svg')} alt="" />
        </button>
      </div>
    );
  }
}
export default BodyIndex;
