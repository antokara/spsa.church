/**
 * since graphql (.gql) files are not typescript files but we still need
 * to import them and they get handled by the webpack loader "graphql-tag/loader"
 * we need to define them as "generic" modules here, to avoid ts/lint errors/warnings
 *
 * @see webpack.common.js
 * @see https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules
 */
declare module '*.gql';
