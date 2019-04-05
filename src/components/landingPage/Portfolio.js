import React, {Component} from 'react';
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';

import Config from '../../js/config';
import { createApolloFetch } from 'apollo-fetch';
import '../../css/landingPage/Portfolio.css';

let uri = Config.api;
const apolloFetch = createApolloFetch({ uri });

class Portfolio extends Component {

  constructor(props){
    super(props);
    this.state = {
      isRendering: true,
      activeTab: 1,
      dropdownOpen: false,
      dropdownText: 'Select Category',
      templates: []
    }
  }


  componentDidMount(){
    let query = 'query{templates{img _id  webname linkweb desc tags  img createdat}}';
    this.authorizeToken();
    apolloFetch({ query }).then((response) => {
      let templates = response.data.templates;
      this.setState({
        isRendering: false,
        templates: templates
      });
    })
  }


  authorizeToken = () => {
    apolloFetch.use(({ request, options }, next) => {
      if(!options.headers){
        options.headers = {};
      }
      options.headers['authorization'] = localStorage['token'];
      next();
    })
  }


  setTabActive = async (tab) => {
    await this.setState({
      activeTab: tab
    });
  }

  tabSelectOnChange = async (name, index) => {
    await this.setState({
      activeTab: index,
      dropdownText: 'Select Category (' + name + ')'
    })
  }

  goToProjectLink = (link) => {
    window.open(link)
  }

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render(){

    const tabs = [
      {name: 'ALL', class: this.state.activeTab  === 1 ? 'activeTab' : ''},
      {name: 'BRAND', class: this.state.activeTab  === 2 ? 'activeTab' : ''},
      {name: 'DESIGN', class: this.state.activeTab  === 3 ? 'activeTab' : ''},
      {name: 'DEVELOPMENT', class: this.state.activeTab  === 4 ? 'activeTab' : ''},
      {name: 'MARKETING', class: this.state.activeTab  === 5 ? 'activeTab' : ''},
    ]

    let galleryBody;
    if(this.state.templates.length === 0){
      galleryBody = <div className="noTemplates"><img src={require('../../images/loading.gif')} alt=""/></div>;
    }else if(this.state.isRendering){
      galleryBody = <div className="noTemplates"><img src={require('../../images/loading.gif')} alt=""/></div>;
    }else {
      galleryBody =  this.state.templates.map(( item, index ) => (
        <div key={index} className="imgContainer" data-aos="zoom-in" data-aos-duration={800}>
          <img className="galleryImages" src={item.img} alt=""/>
          <div className="hoverItems">
            <img className="searchIcon" onClick={() => this.goToProjectLink(item.linkweb)} src={require('../../images/icon-Search.svg')} alt=""/>
            <h4 className="hoverBrand">{item.webname}</h4>
            <p className="hoverDesc">{item.desc}</p>
            <div className="overlay"></div>
           </div>
        </div>
      ))
    }

    return (
      <div className="portfolio" id="portfolio">
        <Container>
          <div className="portfolioContent">
            <div className="titleBar">
              <span>Latest Creative Box</span>
              <h2>Our Portfolio</h2>
            </div>
            <ul className="tabs">
              {
                tabs.map(( item, index ) => (
                  <li key={index}
                      onClick={() => this.setTabActive(index + 1)}
                      className={item.class}
                  >{item.name}
                  </li>
                ))
              }
            </ul>
            <Dropdown className="tabSelect" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret>{this.state.dropdownText}</DropdownToggle>
              <DropdownMenu className="dropdownBody">
                {
                  tabs.map(( item, index ) => (
                    <DropdownItem key={index} onClick={() => this.tabSelectOnChange(item.name, index + 1)}>{item.name}</DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
            <div className="gallery">
              {galleryBody}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default Portfolio;
