import React from 'react';
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

export default CitiesList;
