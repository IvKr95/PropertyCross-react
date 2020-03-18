import {
  SET_SEARCHES, SET_FIELD, SET_LOCATIONS, SET_ERROR, REMOVE_SEARCHES, SET_LOADING,
} from '../actions/types';

const initialState = {
  isLoading: false,
  location: '',
  recentSearches: [],
  locations: null,
  error: null,
};

const propSearchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCHES:
      return {
        ...state,
        recentSearches: payload,
      };
    case REMOVE_SEARCHES:
      return initialState;
    case SET_FIELD:
      return {
        ...state,
        location: payload,
      };
    case SET_LOCATIONS:
      return {
        ...state,
        locations: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export default propSearchReducer;
