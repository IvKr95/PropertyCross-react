/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropertySearch from './components/PropertySearch';
import SearchResults from './components/SearchResults';
import Listing from './components/Listing';
import Favourites from './components/Favourites';

function Routes() {
  return (
    <Switch>
      <Route path="/search-results" component={SearchResults} exact />
      <Route path="/listing-page" component={Listing} />
      <Route path="/favourites" component={Favourites} />
      <Route path="/" component={PropertySearch} exact />
    </Switch>
  );
}

export default Routes;
