import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegisterLink = (props) => (
  <Link className={props.optionalClass} to="/login">Login/Register</Link>
);

export default LoginRegisterLink;
