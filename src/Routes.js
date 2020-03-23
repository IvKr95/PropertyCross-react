import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropertySearchContainer from './components/PropertySearchPage/PropertySearchContainer';
import SearchResultsContainer from './components/SearchResultsPage/SearchResultsContainer';
import ListingContainer from './components/ListingPage/ListingContainer';
import Favourites from './components/FavouritesPage/Favourites';

function Routes() {
  return (
    <Switch>
      <Route path="/search-results" component={SearchResultsContainer} exact />
      <Route path="/listing-page" component={ListingContainer} exact />
      <Route path="/favourites" component={Favourites} exact />
      <Route path="/" component={PropertySearchContainer} exact />
      <Route path="*" render={() => <span>Page Not Exist</span>} />
    </Switch>
  );
}

export default Routes;
