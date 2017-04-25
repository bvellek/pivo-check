import React from 'react';
import PropTypes from 'prop-types';
import CitiesItem from './CitiesItem';

const CitiesList = ({
  cities,
}) => (
  <section className="cities-list">
    <ul>
      {cities.map((city, index) => (
        <li key={index}><CitiesItem cityInfo={city} /></li>
      ))}
    </ul>
  </section>
);

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesList;
