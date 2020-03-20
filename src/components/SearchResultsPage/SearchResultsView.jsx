import React from 'react';
import PropTypes from 'prop-types';
import Listings from './Listings';

function SearchResultsView({
  goToListing, loadMore, currentlyDisplayed, total, listings, searchTerm,
}) {
  const handleClick = (event) => {
    const { about } = event.currentTarget.dataset;
    goToListing(about);
  };

  const onLoadMore = () => {
    loadMore();
  };

  return (
    <div>
      <h2>
        {currentlyDisplayed}
        {' '}
        of
        {' '}
        {total}
        {' '}
        matches
      </h2>

      <Listings listings={listings} onClick={handleClick} />

      {currentlyDisplayed < total && <button type="button" className="btn btn-primary load-more" onClick={onLoadMore}>Load more</button>}
      <small className="text-muted">
        Results for
        {' '}
        {searchTerm}
        , showing
        {' '}
        {currentlyDisplayed}
        {' '}
        of
        {' '}
        {total}
        {' '}
        properties
      </small>
    </div>
  );
}

SearchResultsView.propTypes = {

};

export default SearchResultsView;
