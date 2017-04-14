import React, { Component } from 'react';
import '../../App.css';
import LandingHeader from './LandingHeader';
import LandingPage from './LandingPage';
import CityAddForm from './CityAddForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingHeader />
        <LandingPage />
        <CityAddForm />
      </div>
    );
  }
}

export default App;
