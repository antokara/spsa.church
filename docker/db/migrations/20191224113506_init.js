require('../loadEnv');
const { tableNames } = require('../constants');
const migrationId = '20191224113506_init';
let data;
let lastId;
let indexPrefix;

exports.up = async knex => {
  // @see https://www.postgresql.org/docs/9.6/contrib.html
  await knex.raw('CREATE EXTENSION pg_trgm;');

  // core_store
  // columns
  await knex.schema.createTable(tableNames.coreStore, function(table) {
    table.increments('id');
    table.string('key', 255);
    table.text('value');
    table.string('type', 255);
    table.string('environment', 255);
    table.string('tag', 255);
  });

  // indices
  // @see https://github.com/knex/knex/issues/203
  await knex.raw(
    `CREATE INDEX search_${tableNames.coreStore}_environment ON public.${tableNames.coreStore} USING gin (environment gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.coreStore}_key ON public.${tableNames.coreStore} USING gin (key gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.coreStore}_tag ON public.${tableNames.coreStore} USING gin (tag gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.coreStore}_type ON public.${tableNames.coreStore} USING gin (type gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.coreStore}_value ON public.${tableNames.coreStore} USING gin (value gin_trgm_ops);`
  );

  // data
  ({ data, lastId } = require(`../data/${migrationId}/coreStore`));
  await knex(tableNames.coreStore).insert(data);
  // auto-increment set
  await knex.raw(
    `SELECT setval('${tableNames.coreStore}_id_seq'::regclass, ${lastId});`
  );

  // strapi_administrator
  // columns
  await knex.schema.createTable(tableNames.admin, table => {
    table.increments('id');
    table
      .string('username', 255)
      .unique()
      .notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('resetPasswordToken', 255);
    table.boolean('blocked');
  });
  // indices
  await knex.raw(
    `CREATE INDEX search_${tableNames.admin}_resetpasswordtoken ON public.${tableNames.admin} USING gin ("resetPasswordToken" gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.admin}_username ON public.${tableNames.admin} USING gin (username gin_trgm_ops);`
  );
  // data
  ({ data, lastId } = require(`../data/${migrationId}/admin`));
  await knex(tableNames.admin).insert(data);
  // auto-increment set
  await knex.raw(
    `SELECT setval('${tableNames.admin}_id_seq'::regclass, ${lastId});`
  );

  // upload_file
  // columns
  await knex.schema.createTable(tableNames.uploadFile, table => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('hash', 255).notNullable();
    table.string('sha256', 255);
    table.string('ext', 255);
    table.string('mime', 255).notNullable();
    table.decimal('size', 10, 2).notNullable();
    table.string('url', 255).notNullable();
    table.string('provider', 255).notNullable();
    table.jsonb('provider_metadata');
    table.timestamps(true, true);
  });
  // indices
  await knex.raw(
    `CREATE INDEX search_${tableNames.uploadFile}_ext ON public.${tableNames.uploadFile} USING gin (ext gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.uploadFile}_hash ON public.${tableNames.uploadFile} USING gin (hash gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.uploadFile}_mime ON public.${tableNames.uploadFile} USING gin (mime gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.uploadFile}_name ON public.${tableNames.uploadFile} USING gin (name gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.uploadFile}_provider ON public.${tableNames.uploadFile} USING gin (provider gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.uploadFile}_sha256 ON public.${tableNames.uploadFile} USING gin (sha256 gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.uploadFile}_url ON public.${tableNames.uploadFile} USING gin (url gin_trgm_ops);`
  );

  // upload_file_morph
  // columns
  await knex.schema.createTable(tableNames.uploadFileMorph, table => {
    table.increments('id');
    table.integer('upload_file_id');
    table.integer('related_id');
    table.text('related_type');
    table.text('field');
  });
  // indices
  await knex.raw(
    `CREATE INDEX search_${tableNames.uploadFileMorph}_field ON public.${tableNames.uploadFileMorph} USING gin (field gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${tableNames.uploadFileMorph}_related_type ON public.${tableNames.uploadFileMorph} USING gin (related_type gin_trgm_ops);`
  );

  // users-permissions_permission
  // columns
  await knex.schema.createTable(
    tableNames.usersPermissionsPermission,
    table => {
      table.increments('id');
      table.string('type', 255).notNullable();
      table.string('controller', 255).notNullable();
      table.string('action', 255).notNullable();
      table.boolean('enabled').notNullable();
      table.string('policy', 255);
      table.integer('role');
    }
  );
  // indices
  indexPrefix = `search_${tableNames.usersPermissionsPermission}_`.replace(
    '-',
    '_'
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}action" ON public."${tableNames.usersPermissionsPermission}" USING gin (action gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}controller" ON public."${tableNames.usersPermissionsPermission}" USING gin (controller gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}policy" ON public."${tableNames.usersPermissionsPermission}" USING gin (policy gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}type" ON public."${tableNames.usersPermissionsPermission}" USING gin (type gin_trgm_ops);`
  );
  // data
  ({
    data,
    lastId
  } = require(`../data/${migrationId}/usersPermissionsPermission`));
  await knex(tableNames.usersPermissionsPermission).insert(data);
  // auto-increment set
  await knex.raw(
    `SELECT setval('${tableNames.usersPermissionsPermission}_id_seq'::regclass, ${lastId});`
  );

  // users-permissions_role
  // columns
  await knex.schema.createTable(tableNames.usersPermissionsRole, table => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('description', 255);
    table.string('type', 255).unique();
  });
  // indices
  indexPrefix = `search_${tableNames.usersPermissionsRole}_`.replace('-', '_');
  await knex.raw(
    `CREATE INDEX "${indexPrefix}description" ON public."${tableNames.usersPermissionsRole}" USING gin (description gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}name" ON public."${tableNames.usersPermissionsRole}" USING gin (name gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}type" ON public."${tableNames.usersPermissionsRole}" USING gin (type gin_trgm_ops);`
  );
  // data
  ({ data, lastId } = require(`../data/${migrationId}/usersPermissionsRole`));
  await knex(tableNames.usersPermissionsRole).insert(data);
  // auto-increment set
  await knex.raw(
    `SELECT setval('${tableNames.usersPermissionsRole}_id_seq'::regclass, ${lastId});`
  );

  // users-permissions_user
  // columns
  await knex.schema.createTable(tableNames.usersPermissionsUser, table => {
    table.increments('id');
    table
      .string('username', 255)
      .notNullable()
      .unique();
    table.string('email', 255).notNullable();
    table.string('provider', 255);
    table.string('password', 255);
    table.string('resetPasswordToken', 255);
    table.boolean('confirmed');
    table.boolean('blocked');
    table.integer('role');
    table.timestamps(true, true);
  });
  // indices
  indexPrefix = `search_${tableNames.usersPermissionsUser}_`.replace('-', '_');
  await knex.raw(
    `CREATE INDEX "${indexPrefix}provider" ON public."${tableNames.usersPermissionsUser}" USING gin (provider gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}resetpasswordtoken" ON public."${tableNames.usersPermissionsUser}" USING gin ("resetPasswordToken" gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}username" ON public."${tableNames.usersPermissionsUser}" USING gin (username gin_trgm_ops);`
  );
};

exports.down = async knex => {
  // core_store
  await knex.schema.dropTable(tableNames.coreStore);
  // strapi_administrator
  await knex.schema.dropTable(tableNames.admin);
  // upload_file
  await knex.schema.dropTable(tableNames.uploadFile);
  // upload_file_morph
  await knex.schema.dropTable(tableNames.uploadFileMorph);
  // users-permissions_permission
  await knex.schema.dropTable(tableNames.usersPermissionsPermission);
  // users-permissions_role
  await knex.schema.dropTable(tableNames.usersPermissionsRole);
  // users-permissions_user
  await knex.schema.dropTable(tableNames.usersPermissionsUser);
  // @see https://www.postgresql.org/docs/9.1/sql-dropextension.html
  await knex.raw('DROP EXTENSION pg_trgm CASCADE;');
};
