import {
  SET_SEARCHES,
  SET_FIELD,
  SET_LOCATIONS,
  SET_PROPS,
  SET_ERROR,
  SET_LISTING,
  SET_FAVOURITE,
  SET_FAVOURITES,
  REMOVE_FAVOURITE,
} from './types';
import RecentSearches from '../../dal/RecentSearches';
import axiosInstance from '../../dal/axiosInstance';

export const setSearches = (payload) => ({
  type: SET_SEARCHES,
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


const setPropsAC = (payload) => ({
  type: SET_PROPS,
  payload,
});

export const setErrorAC = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const setLocationsAC = (payload) => ({
  type: SET_LOCATIONS,
  payload,
});

export const setLoading = (payload) => ({
  type: 'SET_LOADING',
  payload,
});

export const searchLocation = (api, params) => (dispatch) => {
  axiosInstance.get(api, { params })
    .then((result) => {
      if (result.status === 200) {
        const appResCode = Number(result.data.response.application_response_code);

        if (appResCode === 100 || appResCode === 101 || appResCode === 110) {
          // the query returned a list of properties
          if (result.data.response.listings.length >= 1) {
            RecentSearches.setNewSearch({
              name: result.data.request.location,
              props: result.data.response.total_results,
            });

            dispatch(setPropsAC({
              currentlyDisplayed: Number(result.data.request.num_res),
              searchTerm: result.data.request.location,
              page: result.data.request.page,
              total: result.data.response.total_results,
              listings: result.data.response.listings,
            }));
          } else {
            dispatch(setErrorAC('Zero properties returned'));
          }
        } else if (appResCode === 200 || appResCode === 202) {
          // The search term was ambiguous.
          // In this case Nestoria returns a list of suggested locations.
          dispatch(setLocationsAC(result.data.response.locations));
        } else {
          // any other response is considered an error
          dispatch(setErrorAC('error'));
        }
      }
      dispatch(setLoading(false));
    })
    .catch((error) => (
      dispatch(setErrorAC(error))
    ));
};
