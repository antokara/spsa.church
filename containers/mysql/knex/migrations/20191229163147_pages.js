require('../loadEnv');
const {
  tableNames,
  defaultCollation,
  defaultCharset,
  statuses
} = require('../constants');
const { asyncForEach } = require('../utils');
const migrationId = '20191229163147_pages';
let data;

exports.up = async knex => {
  // pages
  await knex.schema.createTable(tableNames.collections.pages, table => {
    // standard
    table.charset(defaultCharset);
    table.collate(defaultCollation);
    table.increments();
    table.string('status', 20).defaultTo(statuses.draft);
    table
      .integer('created_by')
      .unsigned()
      .defaultTo(null);
    table.datetime('created_on').defaultTo(null);
    table
      .integer('modified_by')
      .unsigned()
      .defaultTo(null);
    table.datetime('modified_on').defaultTo(null);
    // custom
    table
      .string('key', 200)
      .unique('key')
      .defaultTo(null)
      .comment('for finding the page with code');
    table
      .string('url', 200)
      .unique('url')
      .defaultTo(null)
      .comment('relative URL of the page (ie. /contact-us');
    table.text('content');
    table
      .string('title', 200)
      .defaultTo(null)
      .comment('Page Title');
  });

  // directus_collections
  ({ data } = require(`../data/${migrationId}/${tableNames.core.collections}`));
  await knex(tableNames.core.collections).insert(data);

  // directus_fields
  ({ data } = require(`../data/${migrationId}/${tableNames.core.fields}`));
  await knex(tableNames.core.fields).insert(data);
};

exports.down = async knex => {
  // pages
  await knex.schema.dropTable(tableNames.collections.pages);

  // directus_collections
  ({ data } = require(`../data/${migrationId}/${tableNames.core.collections}`));
  await asyncForEach(
    data,
    async item =>
      await knex(tableNames.core.collections)
        .where('collection', item.collection)
        .del()
        .limit(1)
  );

  // directus_fields
  ({ data } = require(`../data/${migrationId}/${tableNames.core.fields}`));
  await asyncForEach(
    data,
    async item =>
      await knex(tableNames.core.fields)
        .where({ collection: item.collection, field: item.field })
        .del()
        .limit(1)
  );
};
