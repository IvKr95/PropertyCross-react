import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  searchLocation, setSearchField, setSearches, removeSearches,
} from '../../redux/actions/actionCreators';
import withLocalStorage from '../../hocs/withLocalStorage';
import withLocation from '../../hocs/withLocation';
import Locations from './Locations';
import RecentSearches from './RecentSearches';
import Error from './Error';

function PropertySearch({ getEntry, searchByLocation }) {
  const {
    isLoading,
    location,
    recentSearches,
    locations,
    error,
  } = useSelector((state) => state.propSearch);
  const { listings } = useSelector((state) => state.searchResults);

  const dispatch = useDispatch();

  useEffect(() => {
    const entry = getEntry();

    if (entry && entry.length > 0) {
      dispatch(setSearches(entry));
    }
    return () => {
      dispatch(removeSearches());
    };
  }, [locations, error, isLoading]);

  const handleChange = (event) => {
    const { value } = event.target;

    dispatch(setSearchField(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(searchLocation('/api', {
      pretty: 1,
      action: 'search_listings',
      encoding: 'json',
      place_name: location,
    }));
  };

  const handleClick = (event) => {
    const { name } = event.currentTarget.dataset;

    dispatch(searchLocation('/api', {
      pretty: 1,
      action: 'search_listings',
      encoding: 'json',
      place_name: name,
    }));
  };

  const recentSearchesSlot = <RecentSearches recentSearches={recentSearches} onClick={handleClick} />;
  const locationsSlot = <Locations locations={locations} onClick={handleClick} />;
  const errorSlot = <Error error={error} />;
  const box = locations ? locationsSlot : recentSearchesSlot;

  if (!isLoading && listings.length > 0) {
    return <Redirect push to="/search-results" />;
  }
  return (
    <div>
      <p>
        Use the form below to search for houses to buy.
        You can search by place-name, postcode, or click &lsquo;My location&rsquo;,
        to search in your current location!
      </p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="location" value={location} onChange={handleChange} />
        <button type="submit">{isLoading ? 'Loading...' : 'Go'}</button>
      </form>

      <button type="button" onClick={searchByLocation}>My location</button>

      {error ? errorSlot : box}
    </div>
  );
}

PropertySearch.propTypes = {
  getEntry: PropTypes.func.isRequired,
  searchByLocation: PropTypes.func.isRequired,
};

export default withLocalStorage('recentSearches', withLocation(PropertySearch));
