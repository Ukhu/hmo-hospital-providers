import React from 'react';
import './App.scss';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import ExplorePage from './layouts/ExplorePage';
import ViewProvider from './layouts/ViewProvider';
import PageNotFound from './layouts/PageNotFound';

function App() {
  return (
    <BrowserRouter history="">
      <Switch>
        <Route path="/" exact component={ExplorePage}/>
        {/* TODO (5a): Add New Route for Viewing a single Provider */}
        <Route path="/:providerId" exact component={ViewProvider}/>
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
