import React from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

class CityAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.onChange = (address) => this.setState({ address });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { address } = this.state;

    geocodeByAddress(address, (err, { lat, lng }) => {
      if (err) { console.log('Oh no!', err); }

      console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng });
    });
  }

  handleSelect = (address) => {
    this.setState({ address });

    geocodeByAddress(address, (err, { lat, lng }) => {
      if (err) { console.log('Oh no!', err); }

      console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng });
    });
  }

  render() {
    const options = {
      componentRestrictions: { country: 'US' },
      types: ['(cities)'],
    };
    return (

      <section className="city-add">
        <form className="city-add-form" action="index.html" method="post" onSubmit={this.handleFormSubmit}>
          <div>
            <label htmlFor="city-search">Add a city</label>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.onChange}
              onSelect={this.handleSelect}
              options={options}
              inputId={'city-search'}
              inputName={'city'}
              placeholder={'Seattle, WA'}
            />
            <button aria-label="add city" type="submit" name="addCity">Submit City 📍</button>
          </div>
        </form>
      </section>
    );
  }
}

export default CityAddForm;

