import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../../App.css';

import ScrollToTop from './ScrollToTop';
import LandingPage from './LandingPage';
import LoginPageContainer from './LoginPageContainer';
import RegistrationPageContainer from './RegistrationPageContainer';
import CitiesPage from './CitiesPage';
import CityPage from './CityPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename='/'>
        <ScrollToTop>
          <div className="App">
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPageContainer} />
            <Route path="/registration" component={RegistrationPageContainer} />
            <Route exact path="/cities" component={CitiesPage} />
            <Route path="/cities/:city" component={CityPage} />
          </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;
