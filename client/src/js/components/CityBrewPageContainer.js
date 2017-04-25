import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import CityBrewPage from './CityBrewPage';
import CityBrewList from './CityBrewList';
import NoBreweries from './NoBreweries';

class CityPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'none',
    };
  }

  async componentDidMount() {
    await this.props.dispatch(actions.getCityBreweryList(this.props.match.params.cityID));
    document.querySelector('head > title').innerHTML = `${this.props.currentCityData.cityName} | PIVO-CHECK`;
  }

  componentWillUnmount() {
    this.props.dispatch(actions.cleanCityBrewList());
  }

  brewFilterChange = (e) => {
    console.log('hello from the filter select', e.target.value);
    this.setState({ filter: e.target.value });
  }

  render() {
    const brewArr = this.props.currentCityData.brewArr;
    const filteredBrewArr = brewArr.filter((brewery) => {
      if (this.state.filter === 'visited') {
        return brewery.checkoffInfo.completionStatus === 'true';
      } else if (this.state.filter === 'not') {
        return brewery.checkoffInfo.completionStatus !== 'true';
      } else if (this.state.filter === 'none') {
        return brewery;
      }
      return brewery.locationType === this.state.filter;
    });
    console.log(brewArr);
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
        filterValue={this.state.filter}
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
