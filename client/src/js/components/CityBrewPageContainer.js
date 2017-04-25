import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import CityBrewPage from './CityBrewPage';
import CityBrewList from './CityBrewList';
import NoBreweries from './NoBreweries';

class CityPageContainer extends Component {
  async componentDidMount() {
    await this.props.dispatch(actions.getCityBreweryList(this.props.match.params.cityID));
    document.querySelector('head > title').innerHTML = `${this.props.currentCityData.cityName} | PIVO-CHECK`;
  }

  componentWillUnmount() {
    this.props.dispatch(actions.cleanCityBrewList());
  }

  brewFilterChange = (e) => {
    this.props.dispatch(actions.setBreweryFilter(e.target.value));
  }

  checkboxSubmit = (breweryID, checkValue) => {
    this.props.dispatch(actions.checkoffBrewery(breweryID, this.props.match.params.cityID, checkValue));
  }

  ratingSubmit = (breweryID, value) => {
    this.props.dispatch(actions.rateBrewery(breweryID, this.props.match.params.cityID, value));
  }

  render() {
    const brewArr = this.props.currentCityData.brewArr;
    const breweryFilter = this.props.breweryFilter;
    const filteredBrewArr = brewArr.filter((brewery) => {   // Filter the Array of breweries to match the filter setting
      if (breweryFilter === 'visited') {
        return brewery.checkoffInfo.completionStatus === true;
      } else if (breweryFilter === 'not') {
        return brewery.checkoffInfo.completionStatus !== true;
      } else if (breweryFilter === 'none') {
        return brewery;
      }
      return brewery.locationType === breweryFilter;
    }).sort((a, b) => {                                   // Sort the breweries alphabetically by name
      if (a.brewery.name < b.brewery.name) {
        return -1;
      } else if (a.brewery.name > b.brewery.name) {
        return 1;
      }
      return 0;
    });

    let breweryDisplay;
    if (this.props.loadingStatus) {
      breweryDisplay = <div />;
    } else if (filteredBrewArr.length > 0) {            // Send list of filtered breweries to CityBrewList component for display
      breweryDisplay = <CityBrewList breweries={filteredBrewArr} checkboxSubmit={this.checkboxSubmit} ratingSubmit={this.ratingSubmit} />;
    } else {                                            // If no breweries left after filtering, display NoBreweries component
      breweryDisplay = <NoBreweries cityName={this.props.currentCityData.cityName} />;
    }

    return (
      <CityBrewPage
        onFilter={this.brewFilterChange}
        filterValue={this.props.breweryFilter}
        loadingStatus={this.props.loadingStatus}
        currentCityData={this.props.currentCityData}
        breweriesList={breweryDisplay}
        currentBreweryListErrorStatus={this.props.currentBreweryListErrorStatus}
        checkoffErrorStatus={this.props.checkoffErrorStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loadingStatus: state.breweryList.breweryListLoadingStatus,
  currentCityData: state.breweryList.currentCityData,
  currentBreweryListErrorStatus: state.breweryList.currentBreweryListErrorStatus,
  checkoffErrorStatus: state.breweryList.checkoffErrorStatus,
  breweryFilter: state.breweryList.breweryFilter,
});

export default connect(mapStateToProps)(CityPageContainer);
