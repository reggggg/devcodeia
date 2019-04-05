import React, {Component} from 'react';
import { Container } from 'reactstrap';

import '../../css/marketPlace/Banner.css';

class Banner extends Component {
  constructor(props){
    super(props);
    this.state = {
      bannerTitle: 'Themes & Templates',
      bannerSubtitle: '1988 Items found'
    }
  }
  async componentWillReceiveProps(nextProps){
    await this.setState({
      bannerTitle: nextProps.bannerTitle,
      bannerSubtitle: nextProps.bannerSubtitle,
    });
  }

  async componentWillMount(){
    await this.setState({
      bannerTitle: this.props.bannerTitle,
      bannerSubtitle: this.props.bannerSubtitle
    });
  }


  render(){
    return (
      <div className="banner">
        <Container>
          <div className="bannerContent">
            <h1>{this.state.bannerTitle}</h1>
            <h2>{this.state.bannerSubtitle}</h2>
          </div>
        </Container>
      </div>
    );
  }
}
export default Banner;
