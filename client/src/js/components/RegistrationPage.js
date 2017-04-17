import React, { Component } from 'react';
import AuthHeader from './AuthHeader';
import Footer from './Footer';

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  }

  registrationSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (
      <div>
        <AuthHeader />
        <div className="registration-page">
          <main role="main">
            <form className="registration-form" method="post" onSubmit={this.registrationSubmit}>
              <fieldset>
                <legend><h2>Registration</h2></legend>
                <label htmlFor="reg-author-first">First Name:</label>
                <input
                  id="reg-author-first"
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                  required
                />
                <label htmlFor="reg-author-last">Last Name:</label>
                <input
                  id="reg-author-last"
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                  required
                />
                <label htmlFor="reg-email">Email:</label>
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  value={this.state.emailName}
                  onChange={this.handleEmailChange}
                  required
                />
                <label htmlFor="reg-pass">Password:</label>
                <input
                  id="reg-pass"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  required
                />
                <label htmlFor="reg-confirm-pass">Confirm Password:</label>
                <input
                  id="reg-confirm-pass"
                  type="password"
                  name="confirm-password"
                  value={this.state.confirmPassword}
                  onChange={this.handleConfirmPasswordChange}
                  required
                />
              </fieldset>
              <button className="register-btn" type="submit" name="button">Register 🍻</button>
            </form>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
