import { Location } from 'history';
import * as React from 'react';
import * as ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

/**
 * Google Analystics Track Page View component.
 *
 * On change of the location, it tracks the page view
 */
const GATrackPageView: React.FunctionComponent = (): null => {
  // get router location
  const location: Location = useLocation();

  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [location]);

  return null;
};

export { GATrackPageView };
