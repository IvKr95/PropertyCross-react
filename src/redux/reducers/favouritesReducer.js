import { SET_FAVOURITE, REMOVE_FAVOURITE } from '../actions/types';

const initialState = [];

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVOURITE:
      return [...state, action.payload];
    case REMOVE_FAVOURITE:
      return state.filter((fav) => fav.lister_url !== action.payload);
    default:
      return state;
  }
};

export default favouritesReducer;