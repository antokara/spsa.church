import * as React from 'react';
import { render } from 'react-dom';
import { App } from 'src/components/App';
import { serviceWorker } from 'src/helpers/serviceWorker';

// attempt register our service worker
serviceWorker();

// render the main application
render(<App />, document.getElementById('root'));
