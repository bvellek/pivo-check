import React from 'react';
import LoginRegisterLink from './LoginRegisterLink';
import SVGLogo from '../SVGLogo';

const LandingHeader = () => (
  <header className="landing-header top-header" role="banner">
    <div className="landing-wrapper">
      <nav className="landing-nav" role="navigation">
        <LoginRegisterLink />
      </nav>
      <h1 className="landing-logo">
        <span className="visually-hidden">Pivo-Check</span>
        <SVGLogo />
      </h1>
    </div>
  </header>
);

export default LandingHeader;
