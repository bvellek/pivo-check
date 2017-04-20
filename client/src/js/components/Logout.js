import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Auth from './modules/Auth';

const Logout = withRouter(({ history }) => (
  <Link
    to='/logout'
    onClick={async (e) => {
      e.preventDefault();
      await Auth.deauthenticateUser();
      history.push('/login');
    }}
  >
    Logout
  </Link>
));

export default Logout;
