import React, { Component } from 'react';
import LoginPage from './LoginPage';

class LoginPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
      },
    };
  }

  changeUser = (e) => {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user,
    });
  }

  processForm = (e) => {
    e.preventDefault();
    console.log(`email: ${this.state.user.email}`);
    console.log(`password: ${this.state.user.password}`);
  }

  demoSubmit = (e) => {
    e.preventDefault();
    this.setState({
      user: {
        password: 'demoPassword',
        email: 'demouser@PivoCheck.com',
      },
    }, () => {
      document.querySelector('.login-btn').click();
    });
    console.log(`email: ${this.state.user.email}`);
    console.log(`password: ${this.state.user.password}`);
  }

  render() {
    return (
      <LoginPage
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        demoSubmit={this.demoSubmit}
      />
    );
  }
}

export default LoginPageContainer;
