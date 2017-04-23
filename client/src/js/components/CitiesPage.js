import React from 'react';
import PropTypes from 'prop-types';
import InAppHeader from './InAppHeader';
import CityAddForm from './CityAddForm';
import Loader from './Loader';
import Footer from './Footer';

const CitiesPage = ({
  loadingStatus,
  myCities,
  citiesErrorStatus,
  addCityErrorStatus,
}) => (
  <div>
    <InAppHeader />
    <div className="cities-page">
      <main role="main">
        <h1>My Cities</h1>
        <CityAddForm />
        {citiesErrorStatus ? <div className="app-error-msg">Sorry we could not retrieve your cities at this time. Please refresh to try&nbsp;again.</div> : <div />}
        {addCityErrorStatus ? <div className="app-error-msg">Sorry we could not add your city at this time. Please try&nbsp;again.</div> : <div />}
        {loadingStatus ? <Loader /> : myCities }
      </main>
      <Footer />
    </div>
  </div>
);

CitiesPage.propTypes = {
  loadingStatus: PropTypes.bool.isRequired,
  myCities: PropTypes.object.isRequired,
  citiesErrorStatus: PropTypes.bool.isRequired,
  addCityErrorStatus: PropTypes.bool.isRequired,
};

export default CitiesPage;
