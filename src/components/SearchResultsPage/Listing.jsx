/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

function Listing({ listing, onClick: handleClick }) {
  return (
    <li
      className="listing"
      data-about={JSON.stringify(listing)}
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <img className="listing__thumb" src={listing.thumb_url} alt={listing.title} width={listing.thumb_width} height={listing.thumb_height} />
      <span className="listing__price">
        {listing.price_formatted}
      </span>
      <span className="listing__title">
        {listing.title}
      </span>
    </li>
  );
}

Listing.propTypes = {
  listing: PropTypes.shape({
    thumb_url: PropTypes.string,
    thumb_height: PropTypes.number,
    thumb_width: PropTypes.number,
    title: PropTypes.string,
    price_formatted: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Listing;
