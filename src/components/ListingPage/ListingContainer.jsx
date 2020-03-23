import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ListingView from './ListingView';
import { setFavourite, removeFavourite } from '../../redux/actions/actionCreators';
import withLocalStorage from '../../hocs/withLocalStorage';

function ListingContainer({ getEntry, setEntry, removeEntry }) {
  const { isFavourite, listing } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  useEffect(() => {
    function checkIfFavourite() {
      const favs = getEntry();
      return favs.find((fav) => fav.lister_url === listing.lister_url);
    }

    const state = checkIfFavourite();

    if (state) {
      dispatch(setFavourite(state));
    }
  }, []);

  const handleFavouriteState = (name) => {
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
    <ListingView
      handleFavouriteState={handleFavouriteState}
      isFavourite={isFavourite}
      listing={listing}
    />
  );
}

ListingContainer.propTypes = {
  getEntry: PropTypes.func.isRequired,
  setEntry: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
};

export default withLocalStorage('favourites')(ListingContainer);
