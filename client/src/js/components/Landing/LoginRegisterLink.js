import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoginRegisterLink = (props) => (
  <Link className={props.optionalClass} to="/login">Login/Register</Link>
);

// LoginRegisterLink.propTypes = {
//   optionalClass: PropTypes.string,
// };

export default LoginRegisterLink;
