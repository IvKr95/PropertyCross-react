import {
  SET_SEARCHES,
  REMOVE_SEARCHES,
  SET_FIELD,
  SET_ERROR,
  SET_LISTING,
  SET_FAVOURITE,
  SET_FAVOURITES,
  REMOVE_FAVOURITE,
  REMOVE_LISTING,
} from './types';

export const setSearches = (payload) => ({
  type: SET_SEARCHES,
  payload,
});

export const removeSearches = (payload) => ({
  type: REMOVE_SEARCHES,
  payload,
});

export const setSearchField = (payload) => ({
  type: SET_FIELD,
  payload,
});

export const setListing = (payload) => ({
  type: SET_LISTING,
  payload,
});

export const removeListing = (payload) => ({
  type: REMOVE_LISTING,
  payload,
});

export const setFavourite = (payload) => ({
  type: SET_FAVOURITE,
  payload,
});

export const setFavourites = (payload) => ({
  type: SET_FAVOURITES,
  payload,
});

export const removeFavourite = (payload) => ({
  type: REMOVE_FAVOURITE,
  payload,
});

export const removeFavouriteListing = (payload) => ({
  type: 'REMOVE_FAVOURITE_LIS',
  payload,
});

export const removeProps = (payload) => ({
  type: 'REMOVE_PROPS',
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export const setLoading = (payload) => ({
  type: 'SET_LOADING',
  payload,
});
