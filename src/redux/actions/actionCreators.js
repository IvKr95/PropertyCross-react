import {
  SET_SEARCHES,
  REMOVE_SEARCHES,
  SET_FIELD,
  SET_LOCATIONS,
  SET_PROPS,
  SET_ERROR,
  SET_LISTING,
  SET_FAVOURITE,
  SET_FAVOURITES,
  REMOVE_FAVOURITE,
  REMOVE_LISTING,
} from './types';
import RecentSearches from '../../dal/RecentSearches';
import axiosInstance from '../../dal/axiosInstance';

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


const setProps = (payload) => ({
  type: SET_PROPS,
  payload,
});

export const removeProps = (payload) => ({
  type: 'REMOVE_PROPS',
  payload,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const setLocations = (payload) => ({
  type: SET_LOCATIONS,
  payload,
});

export const setLoading = (payload) => ({
  type: 'SET_LOADING',
  payload,
});


export const searchLocation = (api, params) => (dispatch) => {
  dispatch(setLoading(true));
  axiosInstance
    .get(api, { params })
    .then((result) => {
      if (result.status === 200) {
        return result.data;
      }
      dispatch(setError('not 200'));
    })
    .then(({ request, response }) => {
      const appResCode = Number(response.application_response_code);

      if (appResCode === 100 || appResCode === 101 || appResCode === 110) {
        // the query returned a list of properties
        return { request, response };
      } if (appResCode === 200 || appResCode === 202) {
        // The search term was ambiguous.
        // In this case Nestoria returns a list of suggested locations.
        dispatch(setLocations(response.locations));
      } else {
        // any other response is considered an error
        dispatch(setError('error'));
      }
    })
    .then(({ request, response }) => {
      if (response.listings.length >= 1) {
        RecentSearches.setNewSearch({
          name: request.location,
          props: response.total_results,
        });

        dispatch(setProps({
          currentlyDisplayed: Number(request.num_res),
          searchTerm: request.location,
          page: request.page,
          total: response.total_results,
          listings: response.listings,
        }));
        return;
      }
      dispatch(setError('Zero properties returned'));
    })
    .catch((error) => (
      dispatch(setError(error))
    ))
    .finally(() => dispatch(setLoading(false)));
};
