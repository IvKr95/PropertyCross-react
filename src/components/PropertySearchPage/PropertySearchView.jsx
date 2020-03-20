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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" id="location" value={location} placeholder="Edinburgh" aria-describedby="locHelp" onChange={handleChange} />
          <small id="locHelp" className="form-text text-muted">
            Use the form above to search for houses to buy.
            You can search by place-name, postcode, or click &lsquo;My location&rsquo;,
            to search in your current location!
          </small>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              Loading...
            </>
          ) : 'Go'}
        </button>
      </form>

      <button type="button" className="btn btn-primary" onClick={searchByLocation} style={{ marginTop: '20px' }}>My location</button>

      {error ? errorSlot() : box}
    </div>
  );
};


export default PropertySearchView;
