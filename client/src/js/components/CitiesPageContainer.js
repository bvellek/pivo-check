import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import CitiesPage from './CitiesPage';
import CitiesList from './CitiesList';
import NoCities from './NoCities';

class CitiesPageContainer extends Component {
  componentDidMount() {
    document.querySelector('head > title').innerHTML = 'My Cities | PIVO-CHECK';
    this.props.dispatch(actions.cleanAuth());
    this.props.dispatch(actions.getCities());
  }

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
        citiesErrorStatus={this.props.citiesErrorStatus}
        addCityErrorStatus={this.props.addCityErrorStatus}
        deleteCityErrorStatus={this.props.deleteCityErrorStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loadingStatus: state.cities.citiesLoadingStatus,
  myCities: state.cities.myCities,
  citiesErrorStatus: state.cities.citiesErrorStatus,
  addCityErrorStatus: state.cities.addCityErrorStatus,
  deleteCityErrorStatus: state.cities.deleteCityErrorStatus,
});

export default connect(mapStateToProps)(CitiesPageContainer);
