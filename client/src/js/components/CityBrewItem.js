import React from 'react';

const CityBrewItem = ({ breweryInfo }) => (
  <li>
    <form className="checkoff-form" action="index.html" method="post">
      <label htmlFor={`check-${breweryInfo.id}`} className="visually-hidden">Checkoff {breweryInfo.brewery.name}</label>
      <div className='brew-check'>
        <input id={`check-${breweryInfo.id}`} type='checkbox' name={breweryInfo.id} />
          <div>&#10003;</div>
          <div>&#10003;</div>
          <div>&#10003;</div>
      </div>
    </form>
    <div className="brewery-info-container">
      <header>
        <h3>{breweryInfo.brewery.website ? (<a href={breweryInfo.brewery.website} target={`_${breweryInfo.id}`}>{breweryInfo.brewery.name}</a>) : (<a href={`https://www.google.com/search?q=${breweryInfo.brewery.name}`} target={`_${breweryInfo.id}`}>{breweryInfo.brewery.name}</a>)}</h3>
        {breweryInfo.brewery.images ? (<img className="brewery-logo" src={breweryInfo.brewery.images.squareMedium} alt={`${breweryInfo.brewery.name} Logo`} />) : (<img className="brewery-logo" src="https://placehold.it/200x200" alt="No Logo Provided" />)}

      </header>

      <form className="brewery-rating-form" action="index.html" method="post">
        <label htmlFor={`rating-${breweryInfo.id}`}>Rating: <span className="visually-hidden">for {breweryInfo.brewery.name}</span></label>
        <select id={`rating-${breweryInfo.id}`} className="brew-rating-select" name={`select-${breweryInfo.id}`}>
          <option defaultValue value="0">{' '}</option>
          <option value="1">🍺</option>
          <option value="2">🍺🍺</option>
          <option value="3">🍺🍺🍺</option>
        </select>
      </form>

        <div className="adr"><span>Address:</span>
          <a
            className="brewery-adr-link"
            href={`https://www.google.com/maps/place/${breweryInfo.streetAddress || ''},${breweryInfo.locality || ''},+${breweryInfo.region || ''}+${breweryInfo.postalCode || ''}`}
            target={`_map-${breweryInfo.id}`}
          >
          <div className="street-address">{breweryInfo.streetAddress}</div>
          <div className="extended-address">{breweryInfo.extendedAddress}</div>
          <span className="locality">{breweryInfo.locality}</span>
          <span className="comma-one">, </span>
          <span className="region">{breweryInfo.region}</span>{' '}
          <span className="postal-code">{breweryInfo.postalCode}</span>
          </a>
        </div>
        {breweryInfo.phone
          ? (<div className="brewery-phone">
            <span id={`phone-${breweryInfo.id}`}>Phone: </span>
            <a href={`tel:${breweryInfo.phone}`} className="tel" aria-labelledby={`phone-${breweryInfo.id}`}>{breweryInfo.phone}</a>
            </div>)
          : <div />
        }

      <details>
        <summary>Details <span className="visually-hidden">for {breweryInfo.brewery.name}</span></summary>
        <p><span>Type: </span>{breweryInfo.locationTypeDisplay}</p>
        <p className="brewery-description">{breweryInfo.brewery.description}</p>
      </details>
    </div>
  </li>
);

export default CityBrewItem;
