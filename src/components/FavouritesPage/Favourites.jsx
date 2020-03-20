/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setListing, setFavourites } from '../../redux/actions/actionCreators';
import withLocalStorage from '../../hocs/withLocalStorage';
import Listings from './Listings';

const Favourites = ({ getEntry }) => {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  useEffect(() => {
    const entry = getEntry();
    dispatch(setFavourites(entry));
  }, [getEntry]);

  const handleClick = (event) => {
    const { about } = event.currentTarget.dataset;
    dispatch(setListing(about));
  };

  return (
    <main className="main">
      <h1>{favourites.length > 0 ? 'Favourites' : 'You have not added any properties to your favourites'}</h1>
      <Listings favourites={favourites} onClick={handleClick} />
    </main>
  );
};

Favourites.propTypes = {
  getEntry: PropTypes.func.isRequired,
};

export default withLocalStorage('favourites')(Favourites);
