import * as React from 'react';
import { render } from 'react-dom';
import { App } from 'src/containers/App';
import { serviceWorker } from 'src/helpers/serviceWorker';

// attempt register our service worker
const serviceWorkerResult:
  | Promise<ServiceWorkerRegistration>
  | undefined = serviceWorker();
if (serviceWorkerResult !== undefined) {
  serviceWorkerResult.then().catch();
}

// TODO: handle no javascript enabled

// render the main application
render(<App />, document.getElementById('root'));
