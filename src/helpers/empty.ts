/**
 * an empty exporter to avoid importing debug/development packages in production
 * @see webpack.common.js
 */
const empty: undefined = undefined;

export { empty as ReduxLogger, empty as ReduxDevtoolsExtension };
