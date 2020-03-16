import React from 'react';
import PropTypes from 'prop-types';
import Listing from './Listing';

function Listings({ listings, onClick: handleClick }) {
  return (
    <ul className="listings">
      {listings.map((listing) => (
        <Listing key={listing.lister_url} listing={listing} onClick={handleClick} />
      ))}
    </ul>
  );
}

Listings.propTypes = {
  listings: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Listings;
