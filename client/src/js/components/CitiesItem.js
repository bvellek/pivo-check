import React from 'react';
import { Link } from 'react-router-dom';
import SVGDelete from './SVGDelete';

const CitiesItem = ({
  cityInfo,
}) => (
  <div>
    <div className="city-item">
      <Link to={`/cities/${cityInfo._id}`}><h2 className="city-list-title">{cityInfo.cityName}</h2></Link>
      <div className="city-info">
        <p className="city-list-brew-count">{cityInfo.completedCount}/{cityInfo.brewTotal}</p>
        <form className="city-list-delete-form" action="index.html" method="post">
          <button type="submit" name="button"><SVGDelete /><span className="visually-hidden">Delete {cityInfo.cityName}</span></button>
        </form>
      </div>
    </div>

    <div className="delete-city-warning">
      <h3>Delete {cityInfo.cityName}?</h3>
      <p>Deleting a location will permanently remove it from your checklist and you will lose your visited brewery&nbsp;record.</p>
      <form className="delete-city-form" action="index.html" method="post">
        <button className="keep-city-btn" type="button" name="button">No, Keep {cityInfo.cityName}</button> {' '}
        <button className="delete-city-btn" type="button" name="button"><SVGDelete />&nbsp;Yes, Delete {cityInfo.cityName}</button>
      </form>
    </div>
  </div>
);

export default CitiesItem;
