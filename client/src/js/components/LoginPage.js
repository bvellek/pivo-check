import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthHeader from './AuthHeader';
import Footer from './Footer';

const LoginPage = ({
  onSubmit,
  onChange,
  errors,
  user,
  demoSubmit,
}) => (
  <div>
    <AuthHeader />
    <div className="login-page">
      <main role="main">
        <form className="login-form" method="post" onSubmit={onSubmit}>
          <fieldset>
            <legend><h2>Login</h2></legend>
            <label htmlFor="user-email">Email</label>
            <input
              id="user-email"
              type="email"
              name="email"
              value={user.email}
              onChange={onChange}
              required
            />
            <label htmlFor="user-password">Password</label>
            <input
              id="user-password"
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
              required
            />
            <button className="login-btn" type="submit" name="button">Log In 🍻</button>
            <div className="login-form-links">
              <Link to='/register'>Register</Link> {' | '}
              <a href="mailto:resetpassword@PivoCheck.com?subject=Password Reset&body=Hi, I forgot my password. Please reset my password.">Forgot Password?</a>
            </div>
          </fieldset>
          {errors && <p className="error-message">
          <span>{errors.summary}</span>
          <span>{errors.email}</span>
          <span>{errors.password}</span>
        </p>}
        </form>
        <h3>
          <label htmlFor='demo-btn'>Try it out!</label>
        </h3>
        <button
          id='demo-btn'
          className="demo-btn"
          type="button"
          name="demo-btn"
          onClick={demoSubmit}
        >Demo 🍺</button>
      </main>
      <Footer />
    </div>
  </div>
);

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  demoSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginPage;

