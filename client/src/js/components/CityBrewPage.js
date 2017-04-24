import React from 'react';
import PropTypes from 'prop-types';
import InAppHeader from './InAppHeader';
import Loader from './Loader';

import Footer from './Footer';

const CityBrewPage = ({
  loadingStatus,
  currentCityData,
  breweriesList,
  currentCityListErrorStatus,
}) => (
  <div>
    <InAppHeader />
    <div className="city-page">
      <main role="main">
        <header>
          <h1>{currentCityData.cityName}</h1>
          <label htmlFor="brewery-filter"><h2>Brewery&nbsp;Filter: </h2></label> {' '}
          <select id="brewery-filter" name="brewery-filter">
            <option defaultValue value="">All {currentCityData.cityName} Breweries</option>
            <optgroup label="Completed">
              <option value="">Visited</option>
              <option value="">Not Visited</option>
            </optgroup>
            <optgroup label="Brewery Type">
              <option value="">Production Facility</option>
              <option value="">Micro Brewery</option>
              <option value="">Nano Brewery</option>
              <option value="">Restaurant/Ale House</option>
              <option value="">Brewpub</option>
              <option value="">Cidery</option>
              <option value="">Tasting Room</option>
              <option value="">Office</option>
            </optgroup>
          </select>
        </header>
        <section className="breweries-list">
          {loadingStatus ? <Loader /> : <div />}
          {currentCityListErrorStatus ? <div className="app-error-msg">Sorry we could not retrieve your breweries at this time. Please refresh to try&nbsp;again.</div> : <div />}
          {breweriesList || <div />}
        </section>
      </main>
      <Footer />
    </div>
  </div>
);

CityBrewPage.propTypes = {
  loadingStatus: PropTypes.bool.isRequired,
  currentCityData: PropTypes.object.isRequired,
  currentCityListErrorStatus: PropTypes.bool.isRequired,
  breweriesList: PropTypes.object.isRequired,
};

export default CityBrewPage;

