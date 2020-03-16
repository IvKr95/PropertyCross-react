import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  setListing,
  searchLocation,
} from '../redux/actions/actionCreators';


function SearchResults(props) {
  const {
    listings, currentlyDisplayed, total, searchTerm, page,
  } = useSelector((state) => state.searchResults);
  const { listing } = useSelector((state) => state.listing);
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

  if (listing) {
    return <Redirect to="/listing-page" />;
  }
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
      <ul className="listings">
        {listings.map((listing) => (
          <li className="listing" data-about={JSON.stringify(listing)} onClick={handleClick}>
            <img className="listing__thumb" src={listing.thumb_url} alt={listing.title} width={listing.thumb_width} height={listing.thumb_height} />
            <span className="listing__price">
              {listing.price_formatted}
            </span>
            <span className="listing__title">
              {listing.title}
            </span>
          </li>
        ))}
      </ul>
      {currentlyDisplayed < total && <button type="button" className="load-more" onClick={loadMore}>Load more</button>}
      <p>
Results for
        {' '}
        {searchTerm}
term, showing
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
