import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from './js/history';


import Error404 from './components/Error404';
import Store from './components/marketPlace/Store';
import MarketPlace from './components/marketPlace/MarketBody';
import Register from './components/authentication/Register';
import ForgotPassword from './components/authentication/ForgotPassword';
import ItemDetails from './components/marketPlace/ItemDetails';
import Payment from './components/marketPlace/Payment';
import Profile from './components/userCenter/UserSettings';

import './App.css';
import './css/commons.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      getStoreProps: {}
    }
  }

  setStoreProps = async (e) => {
    await this.setState({
      getStoreProps: e
    });
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <MarketPlace>
              <Route exact path="/"
                     render={props =>
                       <Store previewTemplate={(e) => this.setStoreProps(e)} />
                     }
               />
              <Route path="/register" component={Register} />
              <Route path="/forgotPassword" component={ForgotPassword} />
              <Route path="/itemDetails"
                     render={props =>
                       <ItemDetails viewTemplate={this.state.getStoreProps} />
                     }
              />
              <Route path="/payment" component={Payment} />
              <Route path="/profile" component={Profile} />
            </MarketPlace>
            <Route path="*" component={Error404} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
