import React from 'react';
import PropTypes from 'prop-types';
import InAppHeader from './InAppHeader';
import CityAddForm from './CityAddForm';
import Loader from './Loader';
import Footer from './Footer';

const CitiesPage = ({
  loadingStatus,
  myCities,
}) => (
  <div>
    <InAppHeader />
    <div className="cities-page">
      <main role="main">
        <h1>My Cities</h1>
        <CityAddForm />
        {loadingStatus ? <Loader /> : myCities }
      </main>
      <Footer />
    </div>
  </div>
);

CitiesPage.propTypes = {
  loadingStatus: PropTypes.bool.isRequired,
  myCities: PropTypes.object.isRequired,
};

export default CitiesPage;
