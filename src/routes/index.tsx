import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/pages/Home';
import Store from '~/pages/Store';
import NotPage from '~/components/404';
import Details from '~/pages/Details';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/store/:idType/:type" exact component={Store} />
    <Route path="/details/:idPokemon/pokemon" exact component={Details} />

    <Route path="*" component={NotPage} />
  </Switch>
);

export default Routes;
