const initialState = {
  isLoading: false,
  location: '',
  recentSearches: [],
  locations: null,
  isError: false,
  error: null,
};

const propSearchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const actions = {
    SET_SEARCHES() {
      return {
        ...state,
        recentSearches: payload,
      };
    },
    REMOVE_SEARCHES() {
      return {
        ...state,
        recentSearches: [],
      };
    },
    SET_FIELD() {
      return {
        ...state,
        location: payload,
      };
    },
    SEARCH_LOCATION_SUCCESS_LOCATIONS() {
      return {
        ...state,
        locations: payload,
      };
    },
    SET_ERROR() {
      return {
        ...state,
        isError: true,
        error: payload,
      };
    },
    SEARCH_LOCATION_FAILURE() {
      return {
        ...state,
        isError: true,
        error: payload,
      };
    },
    SEARCH_LOCATION_REQUEST() {
      return {
        ...state,
        isLoading: true,
      };
    },
    SEARCH_LOCATION_ENDED() {
      return {
        ...state,
        isLoading: false,
      };
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default propSearchReducer;
