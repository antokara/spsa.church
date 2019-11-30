/**
 * a single route
 */
interface IRoute {
  readonly path: string;
}

/**
 * a collection of routes
 */
interface IRoutes {
  readonly home: IRoute;
  readonly donate: IRoute;
}

// TODO: consider moving this to the CMS and create a getURL function instead by the "key/path"
//       refactor Routes component to use it then and all links as well

/**
 * the application's routes
 */
export const routes: IRoutes = {
  home: {
    path: '/'
  },
  donate: {
    path: '/donate'
  }
};
