/**
 * Application Container
 * the main container of the whole application
 */
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'ReactHotLoader';
import { history } from 'src/helpers/history';
import { store } from 'src/helpers/store';
import * as WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Merienda:400,700:latin', 'Rochester:400:latin']
  }
});

const App: React.FunctionComponent = (): React.ReactElement<
  React.ReactNode
> => (
  <React.Fragment>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>test app container</div>
      </ConnectedRouter>
    </Provider>
  </React.Fragment>
);

const containerApp: React.FunctionComponent = hot(module)(App);

export { containerApp as App };
