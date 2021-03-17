import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/pages/Home';
import Repository from '~/pages/Repository';
import NotPage from '~/components/404';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/repository/:idType/:type" exact component={Repository} />

    <Route path="*" component={NotPage} />
  </Switch>
);

export default Routes;
