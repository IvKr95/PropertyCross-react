/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

function Listing({ listing, onClick: handleClick }) {
  return (
    <li
      className="card mb-3 listing"
      style={{ maxWidth: '540px' }}
      data-about={JSON.stringify(listing)}
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <div className="row no-gutters">
        <div className="col-md-4">
          <img className="card-img listing__thumb" src={listing.thumb_url} alt={listing.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title listing__title">{listing.title}</h5>
            <span className="card-text listing__price">
              {listing.price_formatted}
            </span>
          </div>
        </div>
      </div>
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
