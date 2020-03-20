/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

function Locations({ locations, onClick: handleClick }) {
  return (
    <div>
      <span>Please select a location below:</span>
      <ul className="list-group locations">
        {locations.map((item) => (
          <li
            key={item.place_name}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center location"
            data-name={item.place_name}
            onClick={handleClick}
            onKeyPress={handleClick}
          >
            <span className="location__name">
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

Locations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Locations;
