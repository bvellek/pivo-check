import React from 'react';
import SVGDelete from './SVGDelete';

const CitiesList = ({
  cities,
}) => (
  <section className="cities-list">
    <ul>
      {cities.map((city, index) => (
        <li key={index}>
          <div className="city-item">
            <a href="#"><h2 className="city-list-title">{city.cityName}</h2></a>
            <div className="city-info">
              <p className="city-list-brew-count">{city.completedCount}/{city.brewTotal}</p>
              <form className="city-list-delete-form" action="index.html" method="post">
                <button type="submit" name="button"><SVGDelete /><span className="visually-hidden">Delete {city.cityName}</span></button>
              </form>
            </div>
          </div>

          <div className="delete-city-warning">
            <h3>Delete {city.cityName}?</h3>
            <p>Deleting a location will permanently remove it from your checklist and you will lose your visited brewery record.</p>
            <form className="delete-city-form" action="index.html" method="post">
              <button className="keep-city-btn" type="button" name="button">No, Keep {city.cityName}</button> {' '}
              <button className="delete-city-btn" type="button" name="button"><SVGDelete />&nbsp;Yes, Delete {city.cityName}</button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default CitiesList;
