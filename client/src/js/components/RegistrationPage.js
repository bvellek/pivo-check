import React from 'react';
import PropTypes from 'prop-types';
import AuthHeader from './AuthHeader';
import Footer from './Footer';

const RegistrationPage = ({
  onSubmit,
  onChange,
  user,
  errors,
  // loadingStatus,
}) => (
  <div>
    <AuthHeader />
    <div className="registration-page">
      <main role="main">
        <form className="registration-form" method="post" onSubmit={onSubmit}>
          <fieldset>
            <legend><h2>Registration</h2></legend>
            <label htmlFor="reg-author-first">First Name:</label>
            <input
              id="reg-author-first"
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={onChange}
              required
            />
            <label htmlFor="reg-author-last">Last Name:</label>
            <input
              id="reg-author-last"
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={onChange}
              required
            />
            <label htmlFor="reg-email">Email:</label>
            <input
              id="reg-email"
              type="email"
              name="email"
              value={user.email}
              onChange={onChange}
              required
            />
            <label htmlFor="reg-pass">Password:</label>
            <input
              id="reg-pass"
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
              required
            />
            <label htmlFor="reg-confirm-pass">Confirm Password:</label>
            <input
              id="reg-confirm-pass"
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={onChange}
              required
            />
          </fieldset>
          <button className="register-btn" type="submit" name="button">Register 🍻</button>
          {errors && <p className="error-message">
          <span>{errors.email}</span>
          <span>{errors.firstName}</span>
          <span>{errors.lastName}</span>
          <span>{errors.password}</span>
          </p>}
        </form>
      </main>
      <Footer />
    </div>
  </div>
);

RegistrationPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  // loadingStatus: PropTypes.bool.isRequired,
};

export default RegistrationPage;
