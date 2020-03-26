const commonConfig = require('./.eslintrc.common.js');

module.exports = {
  ...commonConfig,
  parserOptions: {
    project: 'tsconfig.json',
  },
  overrides: [
    {
      files: ['./src/**/*.test*', './src/**/*.test/**'],
    },
  ],
};
