import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../../App.css';

import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import CityAddForm from './CityAddForm';

class App extends Component {
  render() {
    return (
      // <BrowserRouter>
      //   <Route exact path="/" component={LandingPage} />
      //   <Route path="/login" component={LoginPage} />
      //   <Route path="/registration" component={RegistrationPage} />
      //   <Route path="/cities/:city" component={CityPage} />
      //   <Route path="/cities" render={({ path }) => (
      //     <div>
      //       <InAppHeader />
      //       <Route exact path={path} component={CitiesPage} />
      //       <Route path={`${path}/:id`} component={CityPage} />
      //     </div>
      //   )} />
      // </BrowserRouter>
      <BrowserRouter>
        <div className="App">
          <LandingPage />
          <LoginPage />
          <RegistrationPage />
          <CityAddForm />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
