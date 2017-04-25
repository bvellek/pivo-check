import React from 'react';
import PropTypes from 'prop-types';
import CityBrewItem from './CityBrewItem';

const CityBrewList = ({
  checkboxSubmit,
  ratingSubmit,
  breweries,
}) => (
  <ul>
    {breweries.map((brewery, index) => (
      <div key={index}><CityBrewItem breweryInfo={brewery} checkboxSubmit={checkboxSubmit} ratingSubmit={ratingSubmit} /></div>
    ))}
  </ul>
);

CityBrewList.propTypes = {
  checkboxSubmit: PropTypes.func.isRequired,
  ratingSubmit: PropTypes.func.isRequired,
  breweries: PropTypes.array.isRequired,
};

export default CityBrewList;
