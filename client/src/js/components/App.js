import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import '../../App.css';

import Auth from './modules/Auth';
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
            <Route exact path="/" render={() => ( // eslint-disable-line
                !Auth.isUserAuthenticated()
                ? <LandingPage />
                : <Redirect to="/cities" />
              )}
            />
            <Route path="/login" render={() => ( // eslint-disable-line
                !Auth.isUserAuthenticated()
                ? <LoginPageContainer />
                : <Redirect to="/cities" />
              )}
            />
            <Route path="/registration" render={() => ( // eslint-disable-line
                !Auth.isUserAuthenticated()
                ? <RegistrationPageContainer />
                : <Redirect to="/cities" />
              )}
            />
            <Route exact path="/cities" render={() => ( // eslint-disable-line
                Auth.isUserAuthenticated()
                ? <CitiesPage />
                : <Redirect to="/login" />
              )}
            />
            <Route path="/cities/:city" render={() => ( // eslint-disable-line
                Auth.isUserAuthenticated()
                ? <CityPage />
                : <Redirect to="/login" />
              )}
            />
          </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;

// <Route exact path="/" component={LandingPage} />
// <Route path="/login" component={LoginPageContainer} />
// <Route path="/registration" component={RegistrationPageContainer} />
// <Route exact path="/cities" component={CitiesPage} />
// <Route path="/cities/:city" component={CityPage} />

// <Route exact path="logout" render={() => (
//                 Auth.deauthenticatUser();
//                 <Redirect to="/login" />
//               )}
//             />
