/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setListing, setFavourite } from '../redux/actions/actionCreators';

function Favourites(props) {
  const favourites = useSelector((state) => state.favourites);
  const { listing } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  const handleClick = (event) => {
    const { about } = event.currentTarget.dataset;
    dispatch(setListing(about));
  };

  if (listing) {
    return <Redirect to="/listing-page" />;
  }

  return (
    <main className="main">
      <h1>{favourites.length > 0 ? 'Favourites' : 'You have not added any properties to your favourites'}</h1>
      <ul className="listings">
        {favourites.map((fav) => (
          <li className="listing" data-about={JSON.stringify(fav)} onClick={handleClick}>
            <img className="listing__thumb" src={fav.thumb_url} alt={fav.title} width={fav.thumb_width} height={fav.thumb_height} />
            <span className="listing__price">
              {fav.price_formatted}
            </span>
            <span className="listing__title">
              {fav.title}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Favourites;
