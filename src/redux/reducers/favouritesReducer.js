const initialState = [];

const favouritesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const actions = {
    SET_FAVOURITE() {
      return [...state, payload];
    },
    SET_FAVOURITES() {
      return payload;
    },
    REMOVE_FAVOURITE() {
      return state.filter((fav) => fav.lister_url !== action.payload);
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default favouritesReducer;
