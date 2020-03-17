import {
  SET_LISTING, SET_FAVOURITE, REMOVE_FAVOURITE, REMOVE_LISTING,
} from '../actions/types';

const initialState = {
  isFavourite: false,
  listing: null,
};

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTING:
      return {
        ...state,
        listing: JSON.parse(action.payload),
      };
    case SET_FAVOURITE:
      return {
        ...state,
        isFavourite: true,
      };
    case REMOVE_FAVOURITE:
      return {
        ...state,
        isFavourite: false,
      };
    case REMOVE_LISTING:
      return initialState;

    default:
      return state;
  }
};

export default listingReducer;
