import React, { Component } from 'react';
import LandingHeader from './Landing/LandingHeader';
import LandingContent from './Landing/LandingContent';

class LandingPage extends Component {
  componentDidMount() {
    document.querySelector('head > title').innerHTML = 'PIVO-CHECK';
  }
  render() {
    return (
      <div>
    <LandingHeader />
    <LandingContent />
  </div>
    );
  }
}

export default LandingPage;
