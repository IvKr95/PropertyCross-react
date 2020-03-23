/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

const ListingView = ({ handleFavouriteState, isFavourite, listing }) => {
  const {
    price_formatted,
    title,
    img_width,
    img_height,
    img_url,
    bedroom_number,
    bathroom_number,
    summary,
  } = listing;

  const handleClick = (event) => {
    const name = event.target.className;
    handleFavouriteState(name);
  };

  return (
    <main className="main">
      <h1>Property Details</h1>
      <button type="button" className={isFavourite ? 'delete-fav' : 'add-fav'} onClick={handleClick}>
        {isFavourite ? '\u2713' : '\u002B'}
      </button>
      <h1>{price_formatted}</h1>
      <h2>{title}</h2>
      <img src={img_url} alt={title} width={img_width} height={img_height} />
      <span>
        {bedroom_number}
        {' '}
        bed
      </span>
      <span>,</span>
      <span>
        {!bathroom_number ? 'no' : bathroom_number}
        {' '}
        bathrooms
      </span>
      <p>{summary}</p>
    </main>
  );
};

ListingView.propTypes = {
  handleFavouriteState: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  listing: PropTypes.shape({
    price_formatted: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img_width: PropTypes.number.isRequired,
    img_height: PropTypes.number.isRequired,
    img_url: PropTypes.string.isRequired,
    bedroom_number: PropTypes.number.isRequired,
    bathroom_number: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListingView;
