import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  searchLocation, setSearchField, setSearches, setErrorAC,
} from '../redux/actions/actionCreators';
import withLocalStorage from '../hocs/withLocalStorage';

function PropertySearch({ getEntry }) {
  const {
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
  }, [locations, error]);

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

  const recentSearchesSlot = (array) => (
    <ul className="recent-searches">
      {array.map((item) => (
        <li
          className="recent-search"
          data-name={item.name}
          onClick={handleClick}
          onKeyPress={handleClick}
        >
          <span className="recent-search__name">{item.name}</span>
          {' '}
          <span className="recent-search__number">{item.props}</span>
        </li>
      ))}
    </ul>
  );

  const locationsSlot = (array) => (
    <ul>
      {array.map((item) => (
        <li className="location" data-name={item.place_name} onClick={handleClick}>
          <span className="location__name">
            {item.title}
          </span>
        </li>
      ))}
    </ul>
  );

  const box = (
    <div>
      <span>{locations ? 'Please select a location below:' : recentSearches ? 'Recent Searches:' : ''}</span>
      {locations ? locationsSlot(locations) : recentSearches.length > 0 ? recentSearchesSlot(recentSearches) : ''}
    </div>
  );

  const handleSearchByLocation = () => {
    if (!navigator.geolocation) {
      console.error('Your browser does not support geolocation');
      return;
    }

    const success = (position) => {
      const latitude = Number(position.coords.latitude).toFixed(6);
      const longitude = Number(position.coords.longitude).toFixed(6);

      const centrePoint = `${latitude},${longitude}`;

      dispatch(searchLocation('/api', {
        pretty: 1,
        action: 'search_listings',
        encoding: 'json',
        centre_point: centrePoint,
      }));
    };

    const error = () => {
      dispatch(setErrorAC('Location not enabled'));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    listings.length > 0 ? <Redirect to="/search-results" />
      : (
        <div>
          <p>
            Use the form below to search for houses to buy.
            You can search by place-name, postcode, or click &lsquo;My location&rsquo;,
            to search in your current location!
          </p>

          <form onSubmit={handleSubmit}>
            <input type="text" name="location" value={location} onChange={handleChange} />
            <button type="submit">GO</button>
          </form>

          <button type="button" onClick={handleSearchByLocation}>My location</button>

          {error ? <span>{error}</span> : box}
        </div>
      )
  );
}

export default withLocalStorage('recentSearches', PropertySearch);
