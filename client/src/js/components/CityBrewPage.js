import React from 'react';
import PropTypes from 'prop-types';
import InAppHeader from './InAppHeader';
import Loader from './Loader';
import Footer from './Footer';

const CityBrewPage = ({
  onFilter,
  filterValue,
  loadingStatus,
  currentCityData,
  breweriesList,
  currentBreweryListErrorStatus,
  checkoffErrorStatus,
}) => (
  <div>
    <InAppHeader />
    <div className="city-page">
      <main role="main">
        <header>
          <h1>{currentCityData.cityName}</h1>
          <label htmlFor="brewery-filter"><h2>Brewery&nbsp;Filter: </h2></label> {' '}
          <select id="brewery-filter" name="brewery-filter" onChange={onFilter} value={filterValue}>
            <option value="none">All {currentCityData.cityName} Breweries</option>
            <optgroup label="Completed">
              <option value="visited">Visited</option>
              <option value="not">Not Visited</option>
            </optgroup>
            <optgroup label="Brewery Type">
              <option value='production'>Production Facility</option>
              <option value='micro'>Micro Brewery</option>
              <option value='nano'>Nano Brewery</option>
              <option value='restaurant'>Restaurant/Ale House</option>
              <option value='brewpub'>Brewpub</option>
              <option value='cidery'>Cidery</option>
              <option value='tasting'>Tasting Room</option>
            </optgroup>
          </select>
        </header>
        <section className="breweries-list">
          {loadingStatus ? <Loader /> : <div />}
          {currentBreweryListErrorStatus ? <div className="app-error-msg">Sorry we could not retrieve your breweries at this time. Please refresh to try&nbsp;again.</div> : <div />}
          {checkoffErrorStatus ? <div className="app-error-msg">Sorry we could not checkoff or rate this brewery. Please refresh to try&nbsp;again.</div> : <div />}
          {breweriesList || <div />}
        </section>
      </main>
      <Footer />
    </div>
  </div>
);

CityBrewPage.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  currentCityData: PropTypes.object.isRequired,
  currentBreweryListErrorStatus: PropTypes.bool.isRequired,
  breweriesList: PropTypes.object.isRequired,
  checkoffErrorStatus: PropTypes.bool.isRequired,
};

export default CityBrewPage;

