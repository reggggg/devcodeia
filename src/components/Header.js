import React, {Component} from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import '../css/Header.css';

class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      mobileViewIsOpen: false
    }
  }

  mobileViewToggle = () => {
    this.setState({
      mobileViewIsOpen: !this.state.mobileViewIsOpen
    });
  }

  goToAbout = () => {
    document.getElementById('about').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToPortfolio = () => {
    document.getElementById('portfolio').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToClients = () => {
    document.getElementById('clients').scrollIntoView({
      behavior: 'smooth'
    });
  }
  goToContactUs = () => {
    document.getElementById('contactUs').scrollIntoView({
      behavior: 'smooth'
    });
  }



  render(){

    const headerLinks = [
      {name: 'home', func: () => window.location.reload()},
      {name: 'about', func: this.goToAbout},
      {name: 'portfolio', func: this.goToPortfolio},
      {name: 'clients', func: this.goToClients},
      {name: 'contact', func: this.goToContactUs}
    ]


    return (
      <div className="header">
        <Navbar light expand="md">
          <Container>
            <NavbarBrand href="/"><img src={require('../images/logo-CodeiaNavi.svg')} alt=""/></NavbarBrand>
            <NavbarToggler onClick={this.mobileViewToggle} />
            <Collapse className="headerCollapse" isOpen={this.state.mobileViewIsOpen} navbar>
              <Nav className="ml-auto" navbar>
                {
                  headerLinks.map(( item, index ) => (
                    <NavItem className="linksBody" key={index}>
                      <NavLink className="linksText" onClick={item.func}>{item.name}</NavLink>
                    </NavItem>
                  ))
                }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default Header;
