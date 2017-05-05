import React from 'react';
import PropTypes from 'prop-types';
import CityBrewItem from './CityBrewItem';

const CityBrewList = ({
  checkboxSubmit,
  ratingSubmit,
  breweries,
  loadingStatus,
}) => (
  <ul>
    {breweries.map((brewery, index) => (
      <div key={index}><CityBrewItem breweryInfo={brewery} checkboxSubmit={checkboxSubmit} ratingSubmit={ratingSubmit} loadingStatus={loadingStatus} /></div>
    ))}
  </ul>
);

CityBrewList.propTypes = {
  checkboxSubmit: PropTypes.func.isRequired,
  ratingSubmit: PropTypes.func.isRequired,
  breweries: PropTypes.array.isRequired,
  loadingStatus: PropTypes.string.isRequired,
};

export default CityBrewList;
