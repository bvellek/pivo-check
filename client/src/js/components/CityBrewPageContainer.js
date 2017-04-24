import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import CityBrewPage from './CityBrewPage';
import CityBrewList from './CityBrewList';
import NoBreweries from './NoBreweries';

class CityPageContainer extends Component {

  async componentDidMount() {
    await this.props.dispatch(actions.getCityBreweryList(this.props.match.params.cityID)); document.querySelector('head > title').innerHTML = `${this.props.currentCityData.cityName} | PIVO-CHECK`;
  }

  render() {
    // const citiesArr = this.props.myCities;
    // let citiesDisplay;
    // if (citiesArr.length > 0) {
    //   citiesDisplay = <CitiesList cities={citiesArr} />;
    // } else {
    //   citiesDisplay = <NoCities />;
    // }
    const brewArr = this.props.currentCityData.brewArr;
    console.log(brewArr);
    let breweryDisplay;
    try {
      if (brewArr.length > 0) {
        breweryDisplay = <CityBrewList breweries={brewArr} />;
      } else {
        breweryDisplay = <NoBreweries cityName={this.props.currentCityData.cityName} />;
      }
    } catch (error) {
      breweryDisplay = <NoBreweries cityName={this.props.currentCityData.cityName} />;
    }

    return (
      <CityBrewPage
        loadingStatus={this.props.loadingStatus}
        currentCityData={this.props.currentCityData}
        breweriesList={breweryDisplay}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loadingStatus: state.breweryList.breweryListLoadingStatus,
  currentCityData: state.breweryList.currentCityData,
});

export default connect(mapStateToProps)(CityPageContainer);
