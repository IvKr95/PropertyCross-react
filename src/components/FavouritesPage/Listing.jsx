/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Listing({ fav, onClick: handleClick }) {
  return (
    <li
      className="listing"
      data-about={JSON.stringify(fav)}
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <Link to={{
        pathname: '/listing-page',
      }}
      >
        <img className="listing__thumb" src={fav.thumb_url} alt={fav.title} width={fav.thumb_width} height={fav.thumb_height} />
        <span className="listing__price">
          {fav.price_formatted}
        </span>
        <span className="listing__title">
          {fav.title}
        </span>
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
