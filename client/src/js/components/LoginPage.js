import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthHeader from './AuthHeader';
// import Loader from './Loader';
import Footer from './Footer';

const LoginPage = ({
  onSubmit,
  onChange,
  demoSubmit,
  user,
  registrationSuccessMessage,
  errors,
  // loadingStatus,
}) => (
  <div>
    <AuthHeader />
    <div className="login-page">
      <main role="main">
        <form className="login-form" method="post" onSubmit={onSubmit}>
          <fieldset>
          {registrationSuccessMessage.message ? <p className="success-message">{registrationSuccessMessage.message}</p> : <div /> }
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
            {errors.email ? <p className="error-message" aria-live="assertive">
              <span>{errors.email}</span>
            </p> : <div />}
            <label htmlFor="user-password">Password</label>
            <input
              id="user-password"
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
              required
            />
            {errors.password ? <p className="error-message" aria-live="assertive">
              <span>{errors.password}</span>
            </p> : <div />}
            <button className="login-btn" type="submit" name="button">Log In 🍻</button>
            <div className="login-form-links">
              <Link to='/registration'>Register</Link> {' | '}
              <a href="mailto:resetpassword@PivoCheck.com?subject=Password Reset&body=Hi, I forgot my password. Please reset my password.">Forgot Password?</a>
            </div>
          </fieldset>
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
  user: PropTypes.object.isRequired,
  registrationSuccessMessage: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  // loadingStatus: PropTypes.bool.isRequired,
};

export default LoginPage;

