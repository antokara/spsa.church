import * as React from 'react';
import { render } from 'react-dom';
import { App } from 'src/components/App';

// if service worker is supported, register it on page load
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js');
  });
}

render(<App />, document.getElementById('root'));
