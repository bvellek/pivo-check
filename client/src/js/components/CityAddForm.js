import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

class CityAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.onChange = (address) => this.setState({ address });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { address } = this.state;

    geocodeByAddress(address, (err, { lat, lng }, results) => {
      if (err) { console.log('Oh no!', err); }

      console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng }, 'whole results: ', results);
      console.log('new result: ', results[0].address_components[0].short_name, ', ', results[0].address_components[2].short_name);
    });
  }

  handleSelect = (address) => {
    this.setState({ address });

    geocodeByAddress(address, (err, { lat, lng }, results) => {
      if (err) { console.log('Oh no!', err); }

      console.log(`Yay! got latitude and longitude for ${address.locality}`, { lat, lng }, 'whole results: ', results);
      console.log('new result: ', results[0].address_components[0].short_name, ', ', results[0].address_components[2].short_name);
    });
  }

  render() {
    const options = {
      componentRestrictions: { country: 'US' },
      types: ['(cities)'],
    };

    const myStyles = {
      root: {
        position: 'relative',
        margin: '0 auto',
        width: '100%',
        maxWidth: '22em',
        padding: '0',
      },
      input: {
        boxSizing: 'border-box',
        width: '100%',
        lineHeight: '2em',
        margin: '0 auto',
        padding: '0 0.2em',
        color: '#44484D',
      },
      autocompleteItemActive: {
        backgroundColor: '#FFBAB3',
      },
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div>
        <strong>{ formattedSuggestion.mainText }</strong>{' '}
        <small>{ formattedSuggestion.secondaryText }</small>
      </div>
    );

    return (

      <section className='city-add'>
        <form
          className='city-add-form'
          method='post'
          autoComplete='off'
          onSubmit={this.handleFormSubmit}
        >
          <div className='city-form-content'>
            <label htmlFor='city-search'>Add a city</label>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.onChange}
              onSelect={this.handleSelect}
              options={options}
              inputId={'city-search'}
              inputName={'city'}
              styles={myStyles}
              autocompleteItem={AutocompleteItem}
              placeholder={'Seattle, WA'}
            />
            <button aria-label='Add city' type='submit' name='addCity'>Submit City 📍</button>
          </div>
        </form>
      </section>
    );
  }
}

export default CityAddForm;

