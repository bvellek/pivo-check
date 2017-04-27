import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import SVGDelete from './SVGDelete';

export class CitiesItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteDialogStatus: false,
    };
  }

  deleteDialogChange = (e) => {
    e.preventDefault();
    this.setState({
      deleteDialogStatus: !this.state.deleteDialogStatus,
    });
  }

  deleteDialogClose = (e) => {
    e.preventDefault();
    this.setState({
      deleteDialogStatus: false,
    });
  }

  confirmDelete = (e) => {
    e.preventDefault();
    const cityDeleteID = this.props.cityInfo._id;
    this.props.dispatch(actions.deleteCity(cityDeleteID));
  }

  render() {
    const cityInfo = this.props.cityInfo;
    return (
      <div>
        <div className="city-item">
          <Link to={`/cities/${cityInfo._id}`}><h2 className="city-list-title">{cityInfo.cityName}</h2></Link>
          <div className="city-info">
            <p className="city-list-brew-count">{cityInfo.completedCount}/{cityInfo.brewTotal}</p>
            <div className="city-list-delete">
              <button type="submit" name="x-btn" onClick={this.deleteDialogChange}><SVGDelete /><span className="visually-hidden">Delete {cityInfo.cityName}</span></button>
            </div>
          </div>
        </div>

        <div className="delete-city-warning" hidden={!this.state.deleteDialogStatus}>
          <h3>Delete {cityInfo.cityName}?</h3>
          <p>Deleting a location will permanently remove it from your checklist and you will lose your visited brewery&nbsp;record.</p>
          <div className="delete-city">
            <button className="keep-city-btn" type="button" name="keep-btn" onClick={this.deleteDialogClose}>No, Keep {cityInfo.cityName}</button> {' '}
            <button className="delete-city-btn" type="button" name="remove-btn" onClick={this.confirmDelete}><SVGDelete />&nbsp;Yes, Delete {cityInfo.cityName}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(CitiesItem);
