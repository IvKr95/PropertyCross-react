/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setListing, setFavourite, removeFavourite } from '../../redux/actions/actionCreators';
import withLocalStorage from '../../hocs/withLocalStorage';

function Listing({ getEntry, setEntry, removeEntry }) {
  const { isFavourite, listing } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  useEffect(() => {
    const isFavourite = checkIfFavourite();
    if (isFavourite) {
      dispatch(setFavourite(isFavourite));
    }
  }, []);

  const {
    price_formatted,
    title,
    img_width,
    img_height,
    img_url,
    bedroom_number,
    bathroom_number,
    summary,
    lister_url,
  } = listing;


  const checkIfFavourite = () => {
    const favs = getEntry();
    return favs.find((fav) => fav.lister_url === lister_url);
  };

  const handleClick = (event) => {
    const name = event.target.className;

    if (name === 'add-fav') {
      dispatch(setFavourite(listing));
      setEntry(listing);
      return;
    }

    dispatch(removeFavourite(lister_url));
    removeEntry(lister_url);
  };

  if (!listing) {
    return <Redirect to="/" />;
  }

  return (
    <main className="main">
      <h1>Property Details</h1>
      <button type="button" className={isFavourite ? 'delete-fav' : 'add-fav'} onClick={handleClick}>
        {isFavourite ? '\u2713' : '\u002B'}
      </button>
      <h1>{price_formatted}</h1>
      <h2>{title}</h2>
      <img src={img_url} alt={title} width={img_width} height={img_height} />
      <span>
        {bedroom_number}
        {' '}
bed
      </span>
      <span>,</span>
      <span>
        {!bathroom_number ? 'no' : bathroom_number}
        {' '}
bathrooms
      </span>
      <p>{summary}</p>
    </main>
  );
}

export default withLocalStorage('favourites', Listing);
