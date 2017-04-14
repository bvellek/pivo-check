import React, { Component } from 'react';
import '../../App.css';
import LandingHeader from './LandingHeader';
import LandingPage from './LandingPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingHeader />
        <LandingPage />
      </div>
    );
  }
}

export default App;
