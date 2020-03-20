/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Listing({ fav, onClick: handleClick }) {
  return (
    <li
      className="card mb-3 listing"
      style={{ maxWidth: '540px' }}
      data-about={JSON.stringify(fav)}
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <Link to={{
        pathname: '/listing-page',
      }}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img className="card-img listing__thumb" src={fav.thumb_url} alt={fav.title} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title listing__title">{fav.title}</h5>
              <span className="card-text listing__price">
                {fav.price_formatted}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

Listing.propTypes = {
  fav: PropTypes.shape({
    thumb_url: PropTypes.string,
    thumb_height: PropTypes.number,
    thumb_width: PropTypes.number,
    title: PropTypes.string,
    price_formatted: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Listing;
