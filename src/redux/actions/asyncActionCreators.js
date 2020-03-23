import locationAPI from '../../dal/locationAPI';

const getAsyncActions = (type) => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
  ENDED: `${type}_ENDED`,
});

export const searchLocation = (params) => (dispatch) => {
  const SEARCH_LOCATION = getAsyncActions('SEARCH_LOCATION');
  dispatch({ type: SEARCH_LOCATION.REQUEST });

  locationAPI.getLocation(params)
    .then((result) => {
      if (result.listings) {
        dispatch({ type: `${SEARCH_LOCATION.SUCCESS}_LISTINGS`, payload: result.listings });
      } else {
        dispatch({ type: `${SEARCH_LOCATION.SUCCESS}_LOCATIONS`, payload: result.locations });
      }
    }, (error) => {
      dispatch({ type: SEARCH_LOCATION.FAILURE, payload: error.message });
    }).finally(() => dispatch({ type: SEARCH_LOCATION.ENDED }));
};
