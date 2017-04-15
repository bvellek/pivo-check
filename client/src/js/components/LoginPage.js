import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthHeader from './AuthHeader';
import Footer from './Footer';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
    };
  }

  demoSubmit = (e) => {
    e.preventDefault();
    this.setState({
      userEmail: 'demouser@PivoCheck.com',
      userPassword: 'demoPassword',
    });
    console.log(this.state);
    // then call loginSubmit?
  }

  handleEmailChange = (e) => {
    this.setState({ userEmail: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ userPassword: e.target.value });
  }

  loginSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (
      <div>
        <AuthHeader />
        <div className="login-page">
          <main role="main">
            <form className="login-form" method="post" onSubmit={this.loginSubmit}>
              <fieldset>
                <legend><h2>Login</h2></legend>
                <label htmlFor="user-email">Email</label>
                <input
                  id="user-email"
                  type="email"
                  name="email"
                  value={this.state.userEmail}
                  onChange={this.handleEmailChange}
                  required
                />
                <label htmlFor="user-password">Password</label>
                <input
                  id="user-password"
                  type="password"
                  name="password"
                  value={this.state.userPassword}
                  onChange={this.handlePasswordChange}
                  required
                />
                <button className="login-btn" type="submit" name="button">Log In 🍻</button>
                <div className="login-form-links">
                  <Link to='/register'>Register</Link> {' | '}
                  <a href="mailto:resetpassword@PivoCheck.com?subject=Password Reset&body=Hi, I forgot my password. Please reset my password.">Forgot Password?</a>
                </div>
              </fieldset>
            </form>
            <h3>Try it out!</h3>
            <button
              className="demo-btn"
              type="button"
              name="demo-btn"
              onClick={this.demoSubmit}
            >Demo 🍺</button>
          </main>
          <Footer />
        </div>
      </div>

    );
  }
}

export default LoginPage;

