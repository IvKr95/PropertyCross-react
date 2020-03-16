import {
  SET_SEARCHES, SET_FIELD, SET_LOCATIONS, SET_ERROR,
} from '../actions/types';

const initialState = {
  location: '',
  recentSearches: [],
  locations: null,
  error: null,
};

const propSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCHES:
      return {
        ...state,
        recentSearches: action.payload,
      };

    case SET_FIELD:
      return {
        ...state,
        location: action.payload,
      };
    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default propSearchReducer;
