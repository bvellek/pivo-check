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

  render() {
    const brewArr = this.props.currentCityData.brewArr;
    console.log(brewArr);
    let breweryDisplay;
    if (this.props.loadingStatus) {
      breweryDisplay = <div />;
    } else if (brewArr.length > 0) {
      breweryDisplay = <CityBrewList breweries={brewArr} />;
    } else {
      breweryDisplay = <NoBreweries cityName={this.props.currentCityData.cityName} />;
    }

    return (
      <CityBrewPage
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
});

export default connect(mapStateToProps)(CityPageContainer);
