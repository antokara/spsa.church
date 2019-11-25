const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

// allow our tests to use the .env file values
// just like the dev/build do
// it's required for API keys, etc.
require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  transform: {
    '\\.gql$': 'jest-transform-graphql'
  },
  testURL: 'http://localhost',
  coverageDirectory: '<rootDir>/reports/coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['.*.test/.*$'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  setupFiles: ['<rootDir>/jest.setup.ts', 'jest-localstorage-mock'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.afterEnv.ts'],
  clearMocks: true,
  errorOnDeprecated: true
};
