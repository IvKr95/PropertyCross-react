import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  setListing,
  searchLocation,
  removeProps,
} from '../../redux/actions/actionCreators';
import Listings from './Listings';


function SearchResults() {
  const {
    page,
    total,
    listings,
    searchTerm,
    currentlyDisplayed,
  } = useSelector((state) => state.searchResults);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    const { about } = event.currentTarget.dataset;
    dispatch(setListing(about));
  };

  const loadMore = () => {
    dispatch(searchLocation('/api', {
      pretty: 1,
      page: page + 1,
      action: 'search_listings',
      encoding: 'json',
      place_name: searchTerm,
    }));
  };

  if (listings.length === 0) {
    return <Redirect to="/" />;
  }

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

      {currentlyDisplayed < total && <button type="button" className="load-more" onClick={loadMore}>Load more</button>}
      <p>
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
      </p>
    </div>
  );
}

export default SearchResults;
