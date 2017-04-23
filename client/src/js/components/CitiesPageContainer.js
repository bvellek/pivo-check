import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import CitiesPage from './CitiesPage';
import CitiesList from './CitiesList';
import NoCities from './NoCities';

class CitiesPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    document.querySelector('head > title').innerHTML = 'My Cities | PIVO-CHECK';
    this.props.dispatch(actions.cleanAuth());
    this.props.dispatch(actions.getCities());
  }

  addCity = (e) => {
    e.preventDefault();
  }

  // changeUser = (e) => {
  //   const field = e.target.name;
  //   const user = this.state.user;
  //   user[field] = e.target.value;

  //   this.setState({
  //     user,
  //   });
  // }

  // processForm = (e) => {
  //   e.preventDefault();
  //   this.props.dispatch(actions.loginUser(this.state.user));
  //   console.log(`email: ${this.state.user.email}`);
  //   console.log(`password: ${this.state.user.password}`);
  // }

  // demoSubmit = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     user: {
  //       password: 'demoPassword',
  //       email: 'demouser@PivoCheck.com',
  //     },
  //   }, () => {
  //     document.querySelector('.login-btn').click();
  //   });
  //   console.log(`email: ${this.state.user.email}`);
  //   console.log(`password: ${this.state.user.password}`);
  // }

  render() {
    const citiesArr = this.props.myCities;
    let citiesDisplay;
    if (citiesArr.length > 0) {
      citiesDisplay = <CitiesList cities={citiesArr} />;
    } else {
      citiesDisplay = <NoCities />;
    }

    return (
      <CitiesPage
        loadingStatus={this.props.loadingStatus}
        addCity={this.addCity}
        myCities={citiesDisplay}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loadingStatus: state.cities.citiesLoadingStatus,
  myCities: state.cities.myCities,
});

export default connect(mapStateToProps)(CitiesPageContainer);


// <Route exact path="/login" render={() => ( // eslint-disable-line
//           !this.props.loginRedirect
//           ? (<LoginPage
//             onSubmit={this.processForm}
//             onChange={this.changeUser}
//             demoSubmit={this.demoSubmit}
//             user={this.state.user}
//             registrationSuccessMessage={this.props.registrationSuccessMessage}
//             errors={this.props.errors}
//           />)
//           : <Redirect to="/cities" />
//         )}
//       />
