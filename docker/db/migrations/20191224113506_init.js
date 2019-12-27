require('../loadEnv');

const coreStoreTableName = 'core_store';
const adminTableName = 'strapi_administrator';
const uploadFileTableName = 'upload_file';
const uploadFileMorphTableName = 'upload_file_morph';
const usersPermissionsPermissionTableName = 'users-permissions_permission';
const usersPermissionsRoleTableName = 'users-permissions_role';
const usersPermissionsUserTableName = 'users-permissions_user';
let data;
let lastId;
let indexPrefix;

exports.up = async knex => {
  // @see https://www.postgresql.org/docs/9.6/contrib.html
  await knex.raw('CREATE EXTENSION pg_trgm;');

  // core_store
  // columns
  await knex.schema.createTable(coreStoreTableName, function(table) {
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
    `CREATE INDEX search_${coreStoreTableName}_environment ON public.${coreStoreTableName} USING gin (environment gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${coreStoreTableName}_key ON public.${coreStoreTableName} USING gin (key gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${coreStoreTableName}_tag ON public.${coreStoreTableName} USING gin (tag gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${coreStoreTableName}_type ON public.${coreStoreTableName} USING gin (type gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${coreStoreTableName}_value ON public.${coreStoreTableName} USING gin (value gin_trgm_ops);`
  );

  // data
  ({ data, lastId } = require('../data/20191224113506_init/coreStore'));
  await knex(coreStoreTableName).insert(data);
  // auto-increment set
  await knex.raw(
    `SELECT setval('${coreStoreTableName}_id_seq'::regclass, ${lastId});`
  );

  // strapi_administrator
  // columns
  await knex.schema.createTable(adminTableName, table => {
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
    `CREATE INDEX search_${adminTableName}_resetpasswordtoken ON public.${adminTableName} USING gin ("resetPasswordToken" gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${adminTableName}_username ON public.${adminTableName} USING gin (username gin_trgm_ops);`
  );
  // data
  ({ data, lastId } = require('../data/20191224113506_init/admin'));
  await knex(adminTableName).insert(data);
  // auto-increment set
  await knex.raw(
    `SELECT setval('${adminTableName}_id_seq'::regclass, ${lastId});`
  );

  // upload_file
  // columns
  await knex.schema.createTable(uploadFileTableName, table => {
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
    `CREATE INDEX search_${uploadFileTableName}_ext ON public.${uploadFileTableName} USING gin (ext gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${uploadFileTableName}_hash ON public.${uploadFileTableName} USING gin (hash gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${uploadFileTableName}_mime ON public.${uploadFileTableName} USING gin (mime gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${uploadFileTableName}_name ON public.${uploadFileTableName} USING gin (name gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${uploadFileTableName}_provider ON public.${uploadFileTableName} USING gin (provider gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${uploadFileTableName}_sha256 ON public.${uploadFileTableName} USING gin (sha256 gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${uploadFileTableName}_url ON public.${uploadFileTableName} USING gin (url gin_trgm_ops);`
  );

  // upload_file_morph
  // columns
  await knex.schema.createTable(uploadFileMorphTableName, table => {
    table.increments('id');
    table.integer('upload_file_id');
    table.integer('related_id');
    table.text('related_type');
    table.text('field');
  });
  // indices
  await knex.raw(
    `CREATE INDEX search_${uploadFileMorphTableName}_field ON public.${uploadFileMorphTableName} USING gin (field gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX search_${uploadFileMorphTableName}_related_type ON public.${uploadFileMorphTableName} USING gin (related_type gin_trgm_ops);`
  );

  // users-permissions_permission
  // columns
  await knex.schema.createTable(usersPermissionsPermissionTableName, table => {
    table.increments('id');
    table.string('type', 255).notNullable();
    table.string('controller', 255).notNullable();
    table.string('action', 255).notNullable();
    table.boolean('enabled').notNullable();
    table.string('policy', 255);
    table.integer('role');
  });
  // indices
  indexPrefix = `search_${usersPermissionsPermissionTableName}_`.replace(
    '-',
    '_'
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}action" ON public."${usersPermissionsPermissionTableName}" USING gin (action gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}controller" ON public."${usersPermissionsPermissionTableName}" USING gin (controller gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}policy" ON public."${usersPermissionsPermissionTableName}" USING gin (policy gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}type" ON public."${usersPermissionsPermissionTableName}" USING gin (type gin_trgm_ops);`
  );
  // data
  ({
    data,
    lastId
  } = require('../data/20191224113506_init/usersPermissionsPermission'));
  await knex(usersPermissionsPermissionTableName).insert(data);
  // auto-increment set
  await knex.raw(
    `SELECT setval('${usersPermissionsPermissionTableName}_id_seq'::regclass, ${lastId});`
  );

  // users-permissions_role
  // columns
  await knex.schema.createTable(usersPermissionsRoleTableName, table => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('description', 255);
    table.string('type', 255).unique();
  });
  // indices
  indexPrefix = `search_${usersPermissionsRoleTableName}_`.replace('-', '_');
  await knex.raw(
    `CREATE INDEX "${indexPrefix}description" ON public."${usersPermissionsRoleTableName}" USING gin (description gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}name" ON public."${usersPermissionsRoleTableName}" USING gin (name gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}type" ON public."${usersPermissionsRoleTableName}" USING gin (type gin_trgm_ops);`
  );
  // data
  ({
    data,
    lastId
  } = require('../data/20191224113506_init/usersPermissionsRole'));
  await knex(usersPermissionsRoleTableName).insert(data);
  // auto-increment set
  await knex.raw(
    `SELECT setval('${usersPermissionsRoleTableName}_id_seq'::regclass, ${lastId});`
  );

  // users-permissions_user
  // columns
  await knex.schema.createTable(usersPermissionsUserTableName, table => {
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
  indexPrefix = `search_${usersPermissionsUserTableName}_`.replace('-', '_');
  await knex.raw(
    `CREATE INDEX "${indexPrefix}provider" ON public."${usersPermissionsUserTableName}" USING gin (provider gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}resetpasswordtoken" ON public."${usersPermissionsUserTableName}" USING gin ("resetPasswordToken" gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "${indexPrefix}username" ON public."${usersPermissionsUserTableName}" USING gin (username gin_trgm_ops);`
  );
};

exports.down = async knex => {
  // core_store
  await knex.schema.dropTable(coreStoreTableName);
  // strapi_administrator
  await knex.schema.dropTable(adminTableName);
  // upload_file
  await knex.schema.dropTable(uploadFileTableName);
  // upload_file_morph
  await knex.schema.dropTable(uploadFileMorphTableName);
  // users-permissions_permission
  await knex.schema.dropTable(usersPermissionsPermissionTableName);
  // users-permissions_role
  await knex.schema.dropTable(usersPermissionsRoleTableName);
  // users-permissions_user
  await knex.schema.dropTable(usersPermissionsUserTableName);
  // @see https://www.postgresql.org/docs/9.1/sql-dropextension.html
  await knex.raw('DROP EXTENSION pg_trgm CASCADE;');
};
