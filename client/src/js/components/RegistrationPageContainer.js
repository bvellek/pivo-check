import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import RegistrationPage from './RegistrationPage';

class RegistrationPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  processForm = (e) => {
    e.preventDefault();

    this.props.dispatch(actions.registerUser(this.state.user));
    console.log(`firstName: ${this.state.user.firstName}`);
    console.log(`lastName: ${this.state.user.lastName}`);
    console.log(`email: ${this.state.user.email}`);
    console.log(`password: ${this.state.user.password}`);
    console.log(`confirmPassword: ${this.state.user.confirmPassword}`);
  }

  render() {
    return (
      <RegistrationPage
        onSubmit={this.processForm}
        onChange={this.changeUser}
        user={this.state.user}
        errors={this.props.errors}
        // loadingStatus={this.props.loadingStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.auth.registrationErrorMessage,
  // loadingStatus: state.auth.loadingStatus,
});

export default connect(mapStateToProps)(RegistrationPageContainer);
