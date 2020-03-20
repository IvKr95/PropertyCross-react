/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

function RecentSearches({ recentSearches, onClick: handleClick }) {
  return (
    <div>
      <span>Recent Searches:</span>
      <ul className="list-group recent-searches">
        {recentSearches.map((item) => (
          <li
            key={item.name}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center recent-search"
            data-name={item.name}
            onClick={handleClick}
            onKeyPress={handleClick}
          >
            {item.name}
            {' '}
            <span className="badge badge-primary badge-pill recent-search__number">{item.props}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

RecentSearches.propTypes = {
  recentSearches: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecentSearches;
