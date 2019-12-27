require('../loadEnv');
const { tableNames } = require('../constants');
const { asyncForEach } = require('../utils');
const migrationId = '20191226134928_add-page-content-type';
let indexPrefix;
let data;

exports.up = async knex => {
  // pages
  // columns
  await knex.schema.createTable(tableNames.pages, table => {
    table.increments('id');
    table.string('key', 255).unique();
    table
      .string('URL', 255)
      .unique()
      .notNullable();
    table.string('Title', 255);
    table.boolean('Enabled');
  });
  // indices
  indexPrefix = `search_${tableNames.pages}_`;
  await knex.raw(
    `CREATE INDEX ${indexPrefix}key ON public.${tableNames.pages} USING gin (key gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX ${indexPrefix}title ON public.${tableNames.pages} USING gin ("Title" gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX ${indexPrefix}url ON public.${tableNames.pages} USING gin ("URL" gin_trgm_ops);`
  );

  // core_store
  // data
  ({ data } = require(`../data/${migrationId}/coreStore`));
  await knex(tableNames.coreStore).insert(data);

  // users-permissions_permission
  // data
  ({ data } = require(`../data/${migrationId}/usersPermissionsPermission`));
  await knex(tableNames.usersPermissionsPermission).insert(data);
};

exports.down = async knex => {
  // pages
  await knex.schema.dropTable(tableNames.pages);

  // core_store
  ({ data } = require(`../data/${migrationId}/coreStore`));
  await asyncForEach(data, async item =>
    knex(tableNames.coreStore)
      .where('key', item.key)
      .del()
  );

  //users-permissions_permission
  ({ data } = require(`../data/${migrationId}/usersPermissionsPermission`));
  await asyncForEach(data, async item =>
    knex(tableNames.usersPermissionsPermission)
      .where({
        type: item.type,
        controller: item.controller,
        action: item.action
      })
      .del()
  );
};
