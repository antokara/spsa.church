import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Home } from 'src/components/pages/home/Home';
import { NotFound } from 'src/components/pages/notFound/NotFound';
import { routes } from 'src/constants/routes';

const Routes: () => JSX.Element = (): JSX.Element => (
  <Switch>
    <Route exact={true} path={routes.home.path} component={Home} />
    <Route component={NotFound} />
  </Switch>
);

export { Routes };
