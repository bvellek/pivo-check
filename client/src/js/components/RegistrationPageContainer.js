import React, { Component } from 'react';
import RegistrationPage from './RegistrationPage';

class RegistrationPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
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
  };

  processForm = (e) => {
    e.preventDefault();
    console.log(`firstName: ${this.state.user.firstName}`);
    console.log(`lastName: ${this.state.user.lastName}`);
    console.log(`email: ${this.state.user.email}`);
    console.log(`password: ${this.state.user.password}`);
    console.log(`confirmPassword: ${this.state.user.confirmPassword}`);
  };

  render() {
    return (
      <RegistrationPage
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default RegistrationPageContainer;
