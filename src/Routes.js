/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropertySearchContainer from './components/PropertySearchPage/PropertySearchContainer';
import SearchResultsContainer from './components/SearchResultsPage/SearchResultsContainer';
import Listing from './components/ListingPage/Listing';
import Favourites from './components/FavouritesPage/Favourites';

function Routes() {
  return (
    <Switch>
      <Route path="/search-results" component={SearchResultsContainer} exact />
      <Route path="/listing-page" component={Listing} exact />
      <Route path="/favourites" component={Favourites} exact />
      <Route path="/" component={PropertySearchContainer} exact />
      <Route path="*" render={() => <span>Page Not Exist</span>} />
    </Switch>
  );
}

export default Routes;
