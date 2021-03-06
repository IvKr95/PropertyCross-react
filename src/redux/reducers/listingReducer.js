const initialState = {
  isFavourite: false,
  listing: null,
};

const listingReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const actions = {
    SET_LISTING() {
      return {
        ...state,
        listing: JSON.parse(payload),
      };
    },
    SET_FAVOURITE() {
      return {
        ...state,
        isFavourite: true,
      };
    },
    REMOVE_FAVOURITE() {
      return {
        ...state,
        isFavourite: false,
      };
    },
    REMOVE_LISTING() {
      return initialState;
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default listingReducer;
