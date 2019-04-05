import React, {Component} from 'react';
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../../css/marketPlace/Menu.css';

class Menu extends Component {

  constructor(props){
    super(props);
    this.state = {
      installOpen: false,
      popularOpen: false,
      themesOpen: false,
      servicesOpen: false,
      pluginsOpen: false,
    }
  }

  toggleInstall = () => {
    this.setState({
      installOpen: !this.state.installOpen
    });
  }
  togglePopular = () => {
    this.setState({
      popularOpen: !this.state.popularOpen
    });
  }
  toggleThemes = () => {
    this.setState({
      themesOpen: !this.state.themesOpen
    });
  }
  toggleServices = () => {
    this.setState({
      servicesOpen: !this.state.servicesOpen
    });
  }
  togglePlugins = () => {
    this.setState({
      pluginsOpen: !this.state.pluginsOpen
    });
  }

  render(){

    const installsData = [
      {value: 'Action 1'},
      {value: 'Action 2'},
      {value: 'Action 3'},
      {value: 'Action 4'},
    ];
    const popularData = [
      {value: 'Action 1'},
      {value: 'Action 2'},
      {value: 'Action 3'},
      {value: 'Action 4'},
    ];
    const themesData = [
      {value: 'Action 1'},
      {value: 'Action 2'},
      {value: 'Action 3'},
      {value: 'Action 4'},
    ];
    const servicesData = [
      {value: 'Action 1'},
      {value: 'Action 2'},
      {value: 'Action 3'},
      {value: 'Action 4'},
    ];
    const pluginsData = [
      {value: 'Action 1'},
      {value: 'Action 2'},
      {value: 'Action 3'},
      {value: 'Action 4'},
    ];

    return (
      <div className="menu">
        <Container>
          <div className="menuContent">
            <Dropdown className="dropdownBody" isOpen={this.state.installOpen} toggle={this.toggleInstall}>
              <DropdownToggle>One Click Install <img src={require('../../images/market/arrow-down.svg')} alt=""/></DropdownToggle>
              <DropdownMenu>
                {
                  installsData.map(( item, index ) => (
                    <DropdownItem key={index}>{item.value}</DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>

            <Dropdown className="dropdownBody" isOpen={this.state.popularOpen} toggle={this.togglePopular}>
              <DropdownToggle>Popular <img src={require('../../images/market/arrow-down.svg')} alt=""/></DropdownToggle>
              <DropdownMenu>
                {
                  popularData.map(( item, index ) => (
                    <DropdownItem key={index}>{item.value}</DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>

            <Dropdown className="dropdownBody" isOpen={this.state.themesOpen} toggle={this.toggleThemes}>
              <DropdownToggle>Themes <img src={require('../../images/market/arrow-down.svg')} alt=""/></DropdownToggle>
              <DropdownMenu>
                {
                  themesData.map(( item, index ) => (
                    <DropdownItem key={index}>{item.value}</DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>

            <Dropdown className="dropdownBody" isOpen={this.state.servicesOpen} toggle={this.toggleServices}>
              <DropdownToggle>Services <img src={require('../../images/market/arrow-down.svg')} alt=""/></DropdownToggle>
              <DropdownMenu>
                {
                  servicesData.map(( item, index ) => (
                    <DropdownItem key={index}>{item.value}</DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>

            <Dropdown className="dropdownBody" isOpen={this.state.pluginsOpen} toggle={this.togglePlugins}>
              <DropdownToggle>Plugins <img src={require('../../images/market/arrow-down.svg')} alt=""/></DropdownToggle>
              <DropdownMenu>
                {
                  pluginsData.map(( item, index ) => (
                    <DropdownItem key={index}>{item.value}</DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
          </div>
        </Container>
      </div>
    );
  }
}
export default Menu;
