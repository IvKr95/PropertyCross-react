import React from 'react';
import PropTypes from 'prop-types';
import Listing from './Listing';

function Listings({ favourites, onClick: handleClick }) {
  return (
    <ul className="listings">
      {favourites.map((fav) => (
        <Listing fav={fav} onClick={handleClick} />
      ))}
    </ul>
  );
}

Listings.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Listings;
