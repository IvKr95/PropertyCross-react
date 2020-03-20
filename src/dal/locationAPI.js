import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_PROXY_URL}/${process.env.REACT_APP_NESTORIA_URL}`,
  timeout: 5000,
  timeoutErrorMessage: 'Network connection issues / timeout',
});

const locationAPI = {
  getLocation(extraParams) {
    return instance.get('/api', {
      params: {
        pretty: 1,
        action: 'search_listings',
        encoding: 'json',
        ...extraParams,
      },
    })
      .then((response) => response.data)
      .then(({ request, response }) => {
        const appResCode = Number(response.application_response_code);

        if (appResCode === 100 || appResCode === 101 || appResCode === 110) {
        // the query returned a list of properties
          if (response.listings.length) {
            return {
              listings: {
                currentlyDisplayed: Number(request.num_res),
                searchTerm: request.location,
                page: request.page,
                total: response.total_results,
                listings: response.listings,
              },
            };
          }
          throw new Error('Zero properties returned');
        } if (appResCode === 200 || appResCode === 202) {
        // 200
        // The search term was ambiguous.
        // In this case Nestoria returns a list of suggested locations.
        // 201
        // The specified location is not valid,
        // but has a very similar spelling to one or more locations which are valid.
        // Possible valid locations are returned in the response.
          return { locations: response.locations };
        } if (appResCode === 201) {
        // unknown location
          throw new Error('Location not matched');
        }
        // any other response is considered an error
        throw new Error('other');
      }, () => { throw new Error('Network connection issues / timeout'); });
  },
};

export default locationAPI;
