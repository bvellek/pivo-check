import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../../App.css';

import LandingPage from './LandingPage';
import LoginPageContainer from './LoginPageContainer';
import RegistrationPageContainer from './RegistrationPageContainer';
import CitiesPage from './CitiesPage';
import CityPage from './CityPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPageContainer} />
          <Route path="/registration" component={RegistrationPageContainer} />
          <Route path="/cities/:city" component={CitiesPage} />
          <Route exact path="/cities" component={CityPage} />
        </div>
      </BrowserRouter>
      // <BrowserRouter>
      //   <div className="App">
      //     <LandingPage />
      //     <LoginPageContainer />
      //     <RegistrationPageContainer />
      //     <CitiesPage />
      //     <CityPage />
      //   </div>
      // </BrowserRouter>

    );
  }
}

export default App;
