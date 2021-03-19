import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/pages/Home';
import Repository from '~/pages/Repository';
import NotPage from '~/components/404';
import Details from '~/pages/Details';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/repository/:idType/:type" exact component={Repository} />
    <Route path="/details/:idPokemon/pokemon" exact component={Details} />

    <Route path="*" component={NotPage} />
  </Switch>
);

export default Routes;
