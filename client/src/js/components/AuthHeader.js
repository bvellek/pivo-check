import React from 'react';
import { Link } from 'react-router-dom';
import SVGLogo from './SVGLogo';

const AuthHeader = () => (
  <header className="auth-header top-header" role="banner">
    <Link to='/'>
      <h1>
        <span className="visually-hidden">Pivo-Check</span>
        <SVGLogo />
      </h1>
    </Link>
  </header>
);

export default AuthHeader;
