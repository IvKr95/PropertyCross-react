import React from 'react';
import PropTypes from 'prop-types';
import Locations from './Locations';
import RecentSearches from './RecentSearches';
import Error from './Error';

const PropertySearchView = (props) => {
  const {
    updateField,
    searchLoc,
    recentSearches,
    locations,
    error,
    location,
    isLoading,
    searchByLocation,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    searchLoc(location);
  };

  const handleClick = (event) => {
    const { name } = event.currentTarget.dataset;
    searchLoc(name);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    updateField(value);
  };

  const recentSearchesSlot = () => <RecentSearches recentSearches={recentSearches} onClick={handleClick} />;
  const locationsSlot = () => <Locations locations={locations} onClick={handleClick} />;
  const errorSlot = () => <Error error={error} />;
  const box = locations ? locationsSlot() : recentSearchesSlot();

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

      {error ? errorSlot() : box}
    </div>
  );
};


export default PropertySearchView;
