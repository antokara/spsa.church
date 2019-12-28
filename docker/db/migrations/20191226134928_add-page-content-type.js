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

  // pages_components
  // columns
  await knex.schema.createTable(tableNames.pagesComponents, table => {
    table.increments('id');
    table.string('field', 255).notNullable();
    table.integer('order').notNullable();
    table.string('component_type', 255).notNullable();
    table.integer('component_id').notNullable();
    table.integer('page_id').notNullable();
    table
      .foreign('page_id')
      .references('pages.id')
      .onDelete('CASCADE')
      .withKeyName('page_id_fk');
  });

  // components_content_calendars
  // columns
  await knex.schema.createTable(
    tableNames.componentsContentCalendars,
    table => {
      table.increments('id');
      table.string('URL', 255).notNullable();
    }
  );
  // indices
  indexPrefix = `search_${tableNames.componentsContentCalendars}_`;
  await knex.raw(
    `CREATE INDEX ${indexPrefix}url ON public.${tableNames.componentsContentCalendars} USING gin ("URL" gin_trgm_ops);`
  );

  // components_content_contents
  // columns
  await knex.schema.createTable(tableNames.componentsContentContents, table => {
    table.increments('id');
    table.string('Content', 255).notNullable();
  });

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
  // components_content_calendars
  await knex.schema.dropTable(tableNames.componentsContentCalendars);
  // components_content_contents
  await knex.schema.dropTable(tableNames.componentsContentContents);
  // pages_components
  await knex.schema.dropTable(tableNames.pagesComponents);
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
