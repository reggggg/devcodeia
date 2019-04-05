import React, {Component} from 'react';
import MarketHeader from '../MarketHeader';
import Menu from './Menu';
import Banner from './Banner';
import Footer from '../Footer';

import history from '../../js/history';
import '../../css/marketPlace/MarketBody.css';

class MarketBody extends Component {
  constructor(props){
    super(props);
    this.state = {
      urlLocationState: '',
      bannerTitle: '',
      bannerSubtitle: '',
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
    this.getCurrentRoute();
  }
  async componentDidUpdate(prevProps){
    if(this.props.location.pathname !== prevProps.location.pathname){
      this.getCurrentRoute();
    }
  }

  getCurrentRoute = () => {
    if(this.props.location.pathname === '/'){
      this.setState({
        bannerTitle: 'Themes & Templates',
        bannerSubtitle: '1988 Items found'
      });
    }else if(this.props.location.pathname === "/register"){
      this.setState({
        bannerTitle: 'Account Creation',
        bannerSubtitle: 'Register and join our growing community for FREE!'
      });
    }else if(this.props.location.pathname === "/forgotPassword"){
      this.setState({
        bannerTitle: 'Account password reset',
        bannerSubtitle: 'Password Reset'
      });
    }else if(this.props.location.pathname === "/itemDetails"){
      this.setState({
        bannerTitle: 'Item Details',
        bannerSubtitle: 'Complete description of guidelines of the template'
      });
    }else if(this.props.location.pathname === "/payment"){
      this.setState({
        bannerTitle: 'Payment Method',
        bannerSubtitle: 'A convenient one step process payment'
      });
    }else if(this.props.location.pathname === "/profile"){
      this.setState({
        bannerTitle: 'User Account Settings',
        bannerSubtitle: 'Edit your user account credentials'
      });
    }
  }


  render(){
    return (
      <div className="marketBody">
        <MarketHeader />
        <Menu />
        <Banner bannerTitle={this.state.bannerTitle} bannerSubtitle={this.state.bannerSubtitle} />
          <div className="marketBodyContent">
            {this.props.children}
          </div>
        <Footer />
      </div>
    );
  }
}
export default MarketBody;
