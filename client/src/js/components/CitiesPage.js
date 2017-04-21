import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import InAppHeader from './InAppHeader';
import CityAddForm from './CityAddForm';
import SVGDelete from './SVGDelete';
import Footer from './Footer';

class CitiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.dispatch(actions.cleanAuth());
  }

  render() {
    return (
      <div>
        <InAppHeader />
        <div className="cities-page">
          <main role="main">
            <h1>My Cities</h1>
            <section className="city-add">
              <CityAddForm />
            </section>

          {/* if no cities added */}
            <section className="no-cities">
              <h2>Add a City!</h2>
              <p>Looks like you haven't added any cities to your checklist. Submit above to add a city full of breweries!</p>
            </section>

        {/* default */}
            <section className="cities-list">
              <ul>
                <li>
                  <div className="city-item">
                    <a href="#"><h2 className="city-list-title">Seattle, WA</h2></a>
                    <div className="city-info">
                      <p className="city-list-brew-count">7/20</p>
                      <form className="city-list-delete-form" action="index.html" method="post">
                        <button type="submit" name="button"><SVGDelete /><span className="visually-hidden">Delete Seattle</span></button>
                      </form>
                    </div>
                  </div>

                  <div className="delete-city-warning">
                    <h3>Delete Seattle?</h3>
                    <p>Deleting a location will permanently remove it from your checklist and you will lose your visited brewery record.</p>
                    <form className="delete-city-form" action="index.html" method="post">
                      <button className="keep-city-btn" type="button" name="button">No, Keep Seattle</button> {' '}
                      <button className="delete-city-btn" type="button" name="button"><SVGDelete />&nbsp;Yes, Delete Seattle</button>
                    </form>
                  </div>
                </li>

                <li>
                  <div className="city-item">
                    <a href="#"><h2 className="city-list-title">Portland, OR</h2></a>
                    <div className="city-info">
                      <p className="city-list-brew-count">2/68</p>
                      <form className="city-list-delete-form" action="index.html" method="post">
                        <button type="button" name="button"><SVGDelete /><span className="visually-hidden">Delete Portland</span></button>
                      </form>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="city-item">
                    <a href="#"><h2 className="city-list-title">FL. Pops Hammock Seminole Village, FL</h2></a>
                    <div className="city-info">
                      <p className="city-list-brew-count">5/19</p>
                      <form className="city-list-delete-form" action="index.html" method="post">
                        <button type="button" name="button"><SVGDelete /><span className="visually-hidden">Delete Austin</span></button>
                      </form>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect()(CitiesPage);

