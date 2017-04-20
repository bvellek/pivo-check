import React from 'react';
import { Link } from 'react-router-dom';
import SVGLogo from './SVGLogo';
import Logout from './Logout';

const InAppHeader = () => (
  <header className="in-app-header top-header" role="banner">
    <div className="in-app-logo">
      <span className="visually-hidden">Pivo-Check</span>
      <SVGLogo />
    </div>
    <nav role="navigation">
      <Link to='/cities'>My Cities</Link>
      <Logout />
    </nav>
  </header>
);

export default InAppHeader;
