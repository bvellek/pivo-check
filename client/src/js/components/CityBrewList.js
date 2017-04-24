import React from 'react';
import CityBrewItem from './CityBrewItem';

const CityBrewList = ({
  breweries,
}) => (
  <ul>
    {breweries.map((brewery, index) => (
      <div key={index}><CityBrewItem breweryInfo={brewery} /></div>
    ))}
  </ul>
);

export default CityBrewList;
