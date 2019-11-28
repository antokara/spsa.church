import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Generic } from 'src/components/pages/generic/Generic';
import { Home } from 'src/components/pages/home/Home';
import { NotFound } from 'src/components/pages/notFound/NotFound';
import { routes } from 'src/constants/routes';

const Routes: () => JSX.Element = (): JSX.Element => (
  <Switch>
    <Route exact={true} path={routes.home.path} component={Home} />
    <Route exact={true} path={routes.donate.path} component={Generic} />
    <Route component={NotFound} />
  </Switch>
);

export { Routes };
