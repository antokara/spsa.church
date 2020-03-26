/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppContainerProps } from 'react-hot-loader';

type THocFn = <T = React.ComponentType<any>>(
  Component: T,
  props?: AppContainerProps
) => T;

/**
 * A no operation HOC, that helps to avoid importing debug/development packages in production.
 * It just returns the component passed to it, as-is
 *
 * @see https://web-dev-etc.blogspot.com/2017/12/dynamic-import-of-es6-modules-with.html
 * @see tslint.json, tsconfig.json, tsconfig.build.json, webpack.build.js, webpack.dev.js
 */
const hot: (mdl: any) => THocFn = (): THocFn => <T = React.ComponentType<any>>(
  Component: T
): T => Component;

export { hot, THocFn };
