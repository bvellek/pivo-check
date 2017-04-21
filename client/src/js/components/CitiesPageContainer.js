import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import CitiesPage from './CitiesPage';

class CitiesPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    document.querySelector('head > title').innerHTML = 'My Cities | PIVO-CHECK';
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
    return (
      <Route path="/login" render={() => ( // eslint-disable-line
          !this.props.loginRedirect
          ? (<LoginPage
            onSubmit={this.processForm}
            onChange={this.changeUser}
            demoSubmit={this.demoSubmit}
            user={this.state.user}
            registrationSuccessMessage={this.props.registrationSuccessMessage}
            errors={this.props.errors}
          />)
          : <Redirect to="/cities" />
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.auth.loginErrorMessage,
  registrationSuccessMessage: state.auth.registrationSuccessMessage,
  loginRedirect: state.auth.loginRedirect,
});

export default connect(mapStateToProps)(LoginPageContainer);
