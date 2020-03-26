/* eslint-disable @typescript-eslint/no-explicit-any */
import { compose } from 'redux';

/**
 * A no operation function, that helps to avoid importing debug/development packages in production.
 * It just returns undefined but also handles types properly, to pass validation in both dev/build
 *
 * @see https://web-dev-etc.blogspot.com/2017/12/dynamic-import-of-es6-modules-with.html
 * @see tslint.json, tsconfig.json, tsconfig.build.json, webpack.build.js, webpack.dev.js
 */
const composeWithDevTools: (o?: any) => typeof compose | undefined = ():
  | typeof compose
  | undefined => undefined;

export { composeWithDevTools };
