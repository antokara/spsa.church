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
}

/**
 * the application's routes
 */
export const routes: IRoutes = {
  home: {
    path: '/'
  }
};
