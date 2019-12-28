require('../loadEnv');
const { tableNames } = require('../constants');
const { asyncForEach } = require('../utils');
const migrationId = '20191227122600_add-upload-aws-s3';
let indexPrefix;
let data;

exports.up = async knex => {};

exports.down = async knex => {};
