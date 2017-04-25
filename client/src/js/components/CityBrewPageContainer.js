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

  render() {
    const brewArr = this.props.currentCityData.brewArr;
    const breweryFilter = this.props.breweryFilter;
    const filteredBrewArr = brewArr.filter((brewery) => {
      if (breweryFilter === 'visited') {
        return brewery.checkoffInfo.completionStatus === 'true';
      } else if (breweryFilter === 'not') {
        return brewery.checkoffInfo.completionStatus !== 'true';
      } else if (breweryFilter === 'none') {
        return brewery;
      }
      return brewery.locationType === breweryFilter;
    }).sort((a, b) => {
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
    } else if (brewArr.length > 0) {
      breweryDisplay = <CityBrewList breweries={filteredBrewArr} />;
    } else {
      breweryDisplay = <NoBreweries cityName={this.props.currentCityData.cityName} />;
    }

    return (
      <CityBrewPage
        onFilter={this.brewFilterChange}
        filterValue={this.props.breweryFilter}
        loadingStatus={this.props.loadingStatus}
        currentCityData={this.props.currentCityData}
        breweriesList={breweryDisplay}
        currentCityListErrorStatus={this.props.currentCityListErrorStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loadingStatus: state.breweryList.breweryListLoadingStatus,
  currentCityData: state.breweryList.currentCityData,
  currentCityListErrorStatus: state.breweryList.currentCityListErrorStatus,
  breweryFilter: state.breweryList.breweryFilter,
});

export default connect(mapStateToProps)(CityPageContainer);
