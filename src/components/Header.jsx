import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <h1>
        <Link
          to={{
            pathname: '/',
          }}
        >
PropertyCross
        </Link>
      </h1>

      <Link
        to={{
          pathname: '/favourites',
        }}
      >
Favourites
      </Link>
    </header>
  );
}

export default Header;
