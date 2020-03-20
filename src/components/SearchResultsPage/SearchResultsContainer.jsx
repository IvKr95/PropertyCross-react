import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  setListing,
  searchLocation,
} from '../../redux/actions/actionCreators';
import SearchResultsView from './SearchResultsView';

const SearchResultsContainer = () => {
  const {
    page,
    total,
    listings,
    searchTerm,
    currentlyDisplayed,
  } = useSelector((state) => state.searchResults);
  const { listing } = useSelector((state) => state.listing);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!listings.length) {
      history.replace('/');
    }
  }, [listings]);

  const goToListing = (item) => {
    const action = setListing(item);
    dispatch(action);
    history.push('/listing-page');
  };

  const loadMore = () => {
    const action = searchLocation({
      page: page + 1,
      place_name: searchTerm,
    });
    dispatch(action);
  };

  return (
    <SearchResultsView
      goToListing={goToListing}
      loadMore={loadMore}
      currentlyDisplayed={currentlyDisplayed}
      total={total}
      listings={listings}
      searchTerm={searchTerm}
    />
  );
};

export default SearchResultsContainer;
