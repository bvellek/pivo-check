import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import RegistrationPage from './RegistrationPage';
import { Route, Redirect } from 'react-router-dom';

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

  componentDidMount() {
    document.querySelector('head > title').innerHTML = 'Registration | PIVO-CHECK';
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
    console.log('^^RegistrationContainer', this.props.errors);
    return (
      <Route path="/registration" render={() => ( // eslint-disable-line
          !this.props.registerSucces.success
          ? (<RegistrationPage
            onSubmit={this.processForm}
            onChange={this.changeUser}
            user={this.state.user}
            errors={this.props.errors}
          />)
          : <Redirect to="/login" />
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.auth.registrationErrorMessage,
  registerSucces: state.auth.registrationSuccessMessage,
});

export default connect(mapStateToProps)(RegistrationPageContainer);
