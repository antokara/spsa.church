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
