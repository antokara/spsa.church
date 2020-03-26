const commonConfig = require('./.eslintrc.common.js');

module.exports = {
  ...commonConfig,
  parserOptions: {
    project: 'tsconfig.build.json',
  },
};
