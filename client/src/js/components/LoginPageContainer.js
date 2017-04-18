import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import LoginPage from './LoginPage';

class LoginPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.dispatch(actions.loginUser(this.state.user));
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
    console.log('^^LoginContainer', this.props.errors);
    return (
      <LoginPage
        onSubmit={this.processForm}
        onChange={this.changeUser}
        demoSubmit={this.demoSubmit}
        user={this.state.user}
        registrationSuccessMessage={this.props.registrationSuccessMessage}
        errors={this.props.errors}
        // loadingStatus={this.props.loadingStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.auth.loginErrorMessage,
  // loadingStatus: state.auth.loadingStatus,
  registrationSuccessMessage: state.auth.registrationSuccessMessage,
});

export default connect(mapStateToProps)(LoginPageContainer);
