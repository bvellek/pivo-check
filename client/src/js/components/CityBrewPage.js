import React from 'react';
import PropTypes from 'prop-types';
import InAppHeader from './InAppHeader';
import Loader from './Loader';

import Footer from './Footer';


const CityBrewPage = ({
  loadingStatus,
  currentCityData,
  breweriesList,
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
          {breweriesList || <div />}
            <li>
            <div>
              <form className="checkoff-form" action="index.html" method="post">
                <label htmlFor="check-qlT9u4" className="visually-hidden">Checkoff Holy Mountain Brewing Company</label>
                <div className='brew-check'>
                  <input id="check-qlT9u4" type='checkbox' name="Brewery2" />
                    <div>&#10003;</div>
                    <div>&#10003;</div>
                    <div>&#10003;</div>
                </div>
              </form>
              <div className="brewery-info-container">
                <header>
                  <h3><a href="http://blog.holymountainbrewing.com/" target="_qlT9u4">Holy Mountain Brewing Company</a></h3>
                  <img className="brewery-logo" src="https://s3.amazonaws.com/brewerydbapi/brewery/qlT9u4/upload_9yn1gT-squareMedium.png" alt="Bainbridge Island Brewing Company Logo" />
                </header>

                <form className="brewery-rating-form" action="index.html" method="post">
                  <label htmlFor="rating-qlT9u4">Rating: <span className="visually-hidden">for Holy Mountain Brewing Company</span></label>
                  <select id="rating-qlT9u4" className="brew-rating-select" name="">
                    <option selected="true" disabled value="" />
                    <option value="1">🍺</option>
                    <option value="2">🍺🍺</option>
                    <option value="3">🍺🍺🍺</option>
                  </select>
                </form>

                  <div className="adr"><span>Address:</span>
                    <a className="brewery-adr-link" href="https://www.google.com/maps/place/1421+Elliott+Ave+W,+Seattle,+Washington+98119" target="_map-qlT9u4">
                      <div className="street-address">1421 Elliott Ave W</div>
                      <div className="extended-address" />
                      <span className="locality">Seattle</span>
                      <span className="comma-one">, </span>
                      <span className="region">WA</span>{' '}
                      <span className="postal-code">98119</span>
                    </a>
                  </div>

                <details>
                  <summary>Details <span className="visually-hidden">for Holy Mountain Brewing Company</span></summary>
                  <p><span>Type: </span>Micro Brewery</p>
                  <p className="brewery-description">Barrels, Brett, hops. Brewery and Taproom in Seattle, Washington.</p>
                </details>
              </div>
              </div>
            </li>
        </section>
      </main>
      <Footer />
    </div>
  </div>
);

CityBrewPage.propTypes = {
  loadingStatus: PropTypes.bool.isRequired,
  currentCityData: PropTypes.object.isRequired,
};

export default CityBrewPage;

