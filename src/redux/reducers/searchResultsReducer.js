import { SET_PROPS } from '../actions/types';

const initialState = {
  searchTerm: '',
  page: 0,
  currentlyDisplayed: 0,
  total: 0,
  listings: [],
};

const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPS:
      return {
        ...action.payload,
        currentlyDisplayed: state.currentlyDisplayed + action.payload.currentlyDisplayed,
        listings: [...state.listings, ...action.payload.listings],
      };
    case 'REMOVE_PROPS':
      return initialState;
    default:
      return state;
  }
};

export default searchResultsReducer;
