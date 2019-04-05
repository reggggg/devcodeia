import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import Select from 'react-select';

import history from '../../js/history';

import '../../css/userCenter/userSettings.css';

class UserSettings extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCountry: '',
      selectedCity: '',
      listOfCountries: [
        {
          label: 'Philippines',
          value: 'philippines',
          city: [
            {label: 'Manila', value: 'manila'},
            {label: 'Batangas', value: 'batangas'},
            {label: 'Laguna', value: 'laguna'},
          ]
        },
        {
          label: 'China',
          value: 'china',
          city: [
            {label: 'China City 1', value: 'chi1'},
            {label: 'China City 2', value: 'chi2'},
            {label: 'China City 3', value: 'chi3'},
          ]
        },
        {
          label: 'South Korea',
          value: 'southKorea',
          city: [
            {label: 'Korea City 1', value: 'kor1'},
            {label: 'Korea City 2', value: 'kor2'},
            {label: 'Korea City 3', value: 'ko3r'},
          ]
        },
      ],
      listOfCities: [],
      openModalUpdatePassword: false,
      openModalUpdateInfo: false,
    }
  }

  componentWillMount(){
    if(localStorage.length <= 0){
      history.replace('/');
    }
  }

  countryOnChange = async (e) => {
    await this.setState({
      selectedCountry: e,
      selectedCity: '',
      listOfCities: e.city
    });
    console.log(this.state.selectedCountry);
    console.log(this.state.listOfCities);
  }

  citiesOnChange = async (e) => {
    await this.setState({
      selectedCity: e
    });
    console.log(this.state.selectedCity);
  }

  toggleUpdatePasswordModal = () => {
    this.setState({
      openModalUpdatePassword: !this.state.openModalUpdatePassword
    });
  }
  toggleUpdateInfoModal = () => {
    this.setState({
      openModalUpdateInfo: !this.state.openModalUpdateInfo
    });
  }

  render(){
    return (
      <div className="userSettings">
        <Container className="userSettingsContent">
          <Row className="userSettingsBody">
            <Col md="3" className="profileImage">
              <div className="titleBar">
                <h6>Profile</h6>
              </div>
              <div className="changeImage">
                <img src={require('../../images/nouser.png')} alt="" />
                <label>Upload Image</label>
              </div>
            </Col>
            <Col md="9" className="rightForm">
              <div className="changePassword">
                <label>Change Password</label>
                <div className="inputs">
                  <input type="password"
                         placeholder="Old password"
                  />
                  <input type="password"
                         placeholder="New password"
                  />
                  <input type="password"
                         placeholder="Re-type new password"
                  />
                  <div className="changePassSubmit">
                    <button onClick={this.toggleUpdatePasswordModal}>Update Password</button>
                  </div>
                </div>
              </div>
              <div className="accountInfo">
                <div className="nameAndEmail">
                  <label>Account Information</label>
                  <div className="inputs">
                    <h6>Profile Name</h6>
                    <input type="text"
                           placeholder="{profileName}"
                    />
                    <h6>Email</h6>
                    <input type="email"
                           placeholder="{profileEmail}"
                    />
                  </div>
                </div>
                <div className="countryAndState">
                  <label>Country and State</label>
                  <Row className="selects">
                    <Col md="6">
                      <Select
                        placeholder="Select Country"
                        className="accountInputSelect"
                        value={this.state.selectedCountry}
                        onChange={this.countryOnChange}
                        options={this.state.listOfCountries}
                      />
                    </Col>
                    <Col md="6">
                      <Select
                        placeholder="Select City"
                        className="accountInputSelect"
                        value={this.state.selectedCity}
                        onChange={this.citiesOnChange}
                        options={this.state.listOfCities}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="aboutMe">
                  <label>About me</label>
                  <Row className="inputs">
                    <Col md="6">
                      <input type="text"
                             placeholder="{firstName}"
                      />
                    </Col>
                    <Col md="6">
                      <input type="text"
                             placeholder="{lastName}"
                      />
                    </Col>
                  </Row>
                  <div className="aboutEditor">
                    <h6>About me</h6>
                    <textarea name=""
                              cols="30"
                              rows="7"
                              placeholder="Bio"
                    />
                    <div className="submitUpdateInfo">
                      <button onClick={this.toggleUpdateInfoModal}>Update Information</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Confirmation Modals  */}
        <CSSTransition
          in={this.state.openModalUpdatePassword}
          timeout={300}
          classNames="alert"
          unmountOnExit
          >
          <div className="userSettingsModal">
            <div className="userSettingsModalBody">
              <h4>Are you sure you want to change your password?</h4>
              <div className="tickButtons">
                <button className="yes">Yes</button>
                <button className="cancel" onClick={this.toggleUpdatePasswordModal}>Cancel</button>
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={this.state.openModalUpdateInfo}
          timeout={300}
          classNames="alert"
          unmountOnExit
          >
          <div className="userSettingsModal">
            <div className="userSettingsModalBody">
              <h4>Are you sure you want to update your profile?</h4>
              <div className="tickButtons">
                <button className="yes">Yes</button>
                <button className="cancel" onClick={this.toggleUpdateInfoModal}>Cancel</button>
              </div>
            </div>
          </div>
        </CSSTransition>
        {/* End of Confirmation Modals  */}
      </div>
    );
  }
}
export default UserSettings;
