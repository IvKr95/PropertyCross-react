import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  searchLocation, setSearchField, setSearches,
} from '../../redux/actions/actionCreators';
import withLocalStorage from '../../hocs/withLocalStorage';
import withLocation from '../../hocs/withLocation';
import PropertySearchView from './PropertySearchView';

const PropertySearch = ({ setNewSearch, getEntry, searchByLocation }) => {
  const {
    isLoading,
    location,
    recentSearches,
    locations,
    error,
  } = useSelector((state) => state.propSearch);
  const { listings, total, searchTerm } = useSelector((state) => state.searchResults);
  const history = useHistory();
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  useEffect(() => {
    const entry = getEntry();

    if (entry && entry.length) {
      dispatch(setSearches(entry));
    }
  }, [locations, error]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!isLoading && listings.length) {
      setNewSearch({
        name: searchTerm,
        props: total,
      });
      history.push('/search-results');
    }
  }, [isLoading, listings]);

  const updateField = (value) => {
    const action = setSearchField(value);
    dispatch(action);
  };

  const searchLoc = (location) => {
    const action = searchLocation({ place_name: location });
    dispatch(action);
  };

  return (
    <PropertySearchView
      updateField={updateField}
      searchLoc={searchLoc}
      recentSearches={recentSearches}
      locations={locations}
      error={error}
      location={location}
      isLoading={isLoading}
      searchByLocation={searchByLocation}
    />
  );
};

PropertySearch.propTypes = {
  getEntry: PropTypes.func.isRequired,
  searchByLocation: PropTypes.func.isRequired,
};

export default withLocalStorage('recentSearches')(withLocation(PropertySearch));
