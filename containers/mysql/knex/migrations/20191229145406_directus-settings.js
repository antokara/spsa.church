require('../loadEnv');
const { tableNames } = require('../constants');

exports.up = async knex => {
  await knex(tableNames.directusSettings)
    .where('key', 'project_color')
    .update('value', '#C68567')
    .limit(1);
  await knex(tableNames.directusSettings)
    .where('key', 'password_policy')
    .update(
      'value',
      "/(?=^.{8,}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{';'?>.<,])(?!.*s).*$/"
    )
    .limit(1);
  await knex(tableNames.directusSettings)
    .where('key', 'project_name')
    .update('value', 'SPSA')
    .limit(1);
};

exports.down = async knex => {
  await knex(tableNames.directusSettings)
    .where('key', 'project_color')
    .update('value', '#263238')
    .limit(1);
  await knex(tableNames.directusSettings)
    .where('key', 'password_policy')
    .update('value', '')
    .limit(1);
  await knex(tableNames.directusSettings)
    .where('key', 'project_name')
    .update('value', 'Directus')
    .limit(1);
};
