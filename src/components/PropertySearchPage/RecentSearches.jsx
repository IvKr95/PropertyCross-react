/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

function RecentSearches({ recentSearches, onClick: handleClick }) {
  return (
    <div>
      <span>Recent Searches:</span>
      <ul className="recent-searches">
        {recentSearches.map((item) => (
          <li
            key={item.name}
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
    </div>

  );
}

RecentSearches.propTypes = {
  recentSearches: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecentSearches;
