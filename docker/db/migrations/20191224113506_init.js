const config = require('dotenv').config;
config({
  path: '../.env'
});

const coreStoreTableName = 'core_store1';
const adminTableName = 'strapi_administrator1';
const uploadFileTableName = 'upload_file1';
const uploadFileMorphTableName = 'upload_file_morph1';
const usersPermissionsPermissionTableName = 'users-permissions_permission1';
const usersPermissionsRoleTableName = 'users-permissions_role1';
const usersPermissionsUserTableName = 'users-permissions_user1';

exports.up = async knex => {
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
  await knex(coreStoreTableName).insert([
    {
      id: 1,
      key: 'db_model_users-permissions_role',
      value:
        '{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"collection":"permission","via":"role","plugin":"users-permissions","configurable":false,"isVirtual":true},"users":{"collection":"user","via":"role","configurable":false,"plugin":"users-permissions","isVirtual":true}}',
      type: 'object',
      environment: null,
      tag: null
    },
    {
      id: 2,
      key: 'db_model_upload_file',
      value:
        '{"name":{"type":"string","configurable":false,"required":true},"hash":{"type":"string","configurable":false,"required":true},"sha256":{"type":"string","configurable":false},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"collection":"*","filter":"field","configurable":false},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}',
      type: 'object',
      environment: null,
      tag: null
    },
    {
      id: 3,
      key: 'db_model_strapi_administrator',
      value:
        '{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"password":{"type":"password","minLength":6,"configurable":false,"private":true,"required":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"blocked":{"type":"boolean","default":false,"configurable":false}}',
      type: 'object',
      environment: null,
      tag: null
    },
    {
      id: 4,
      key: 'db_model_users-permissions_user',
      value:
        '{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"model":"role","via":"users","plugin":"users-permissions","configurable":false},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}',
      type: 'object',
      environment: null,
      tag: null
    },
    {
      id: 5,
      key: 'db_model_core_store',
      value:
        '{"key":{"type":"string"},"value":{"type":"text"},"type":{"type":"string"},"environment":{"type":"string"},"tag":{"type":"string"}}',
      type: 'object',
      environment: null,
      tag: null
    },
    {
      id: 6,
      key: 'db_model_users-permissions_permission',
      value:
        '{"type":{"type":"string","required":true,"configurable":false},"controller":{"type":"string","required":true,"configurable":false},"action":{"type":"string","required":true,"configurable":false},"enabled":{"type":"boolean","required":true,"configurable":false},"policy":{"type":"string","configurable":false},"role":{"model":"role","via":"permissions","plugin":"users-permissions","configurable":false}}',
      type: 'object',
      environment: null,
      tag: null
    },
    {
      id: 7,
      key: 'db_model_upload_file_morph',
      value:
        '{"upload_file_id":{"type":"integer"},"related_id":{"type":"integer"},"related_type":{"type":"text"},"field":{"type":"text"}}',
      type: 'object',
      environment: null,
      tag: null
    },
    {
      id: 8,
      key: 'plugin_users-permissions_grant',
      value:
        '{"email":{"enabled":true,"icon":"envelope"},"discord":{"enabled":false,"icon":"discord","key":"","secret":"","callback":"/auth/discord/callback","scope":["identify","email"]},"facebook":{"enabled":false,"icon":"facebook-square","key":"","secret":"","callback":"/auth/facebook/callback","scope":["email"]},"google":{"enabled":false,"icon":"google","key":"","secret":"","callback":"/auth/google/callback","scope":["email"]},"github":{"enabled":false,"icon":"github","key":"","secret":"","redirect_uri":"/auth/github/callback","scope":["user","user:email"]},"microsoft":{"enabled":false,"icon":"windows","key":"","secret":"","callback":"/auth/microsoft/callback","scope":["user.read"]},"twitter":{"enabled":false,"icon":"twitter","key":"","secret":"","callback":"/auth/twitter/callback"},"instagram":{"enabled":false,"icon":"instagram","key":"","secret":"","callback":"/auth/instagram/callback"}}',
      type: 'object',
      environment: '',
      tag: ''
    },
    {
      id: 9,
      key: 'plugin_email_provider',
      value:
        '{"provider":"sendmail","name":"Sendmail","auth":{"sendmail_default_from":{"label":"Sendmail Default From","type":"text"},"sendmail_default_replyto":{"label":"Sendmail Default Reply-To","type":"text"}}}',
      type: 'object',
      environment: 'production',
      tag: ''
    },
    {
      id: 10,
      key: 'plugin_upload_provider',
      value:
        '{"provider":"local","name":"Local server","enabled":true,"sizeLimit":1000000}',
      type: 'object',
      environment: 'production',
      tag: ''
    },
    {
      id: 13,
      key:
        'plugin_content_manager_configuration_content_types::plugins::upload.file',
      value:
        '{"uid":"plugins::upload.file","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"hash":{"edit":{"label":"Hash","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Hash","searchable":true,"sortable":true}},"sha256":{"edit":{"label":"Sha256","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Sha256","searchable":true,"sortable":true}},"ext":{"edit":{"label":"Ext","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Ext","searchable":true,"sortable":true}},"mime":{"edit":{"label":"Mime","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Mime","searchable":true,"sortable":true}},"size":{"edit":{"label":"Size","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Size","searchable":true,"sortable":true}},"url":{"edit":{"label":"Url","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Url","searchable":true,"sortable":true}},"provider":{"edit":{"label":"Provider","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Provider","searchable":true,"sortable":true}},"provider_metadata":{"edit":{"label":"Provider_metadata","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Provider_metadata","searchable":false,"sortable":false}},"related":{"edit":{"label":"Related","description":"","placeholder":"","visible":true,"editable":true,"mainField":"id"},"list":{"label":"Related","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","hash","sha256"],"edit":[[{"name":"name","size":6},{"name":"hash","size":6}],[{"name":"sha256","size":6},{"name":"ext","size":6}],[{"name":"mime","size":6},{"name":"size","size":4}],[{"name":"url","size":6},{"name":"provider","size":6}],[{"name":"provider_metadata","size":12}]],"editRelations":["related"]}}',
      type: 'object',
      environment: '',
      tag: ''
    },
    {
      id: 16,
      key: 'plugin_users-permissions_email',
      value:
        '{"reset_password":{"display":"Email.template.reset_password","icon":"sync","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"­Reset password","message":"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>"}},"email_confirmation":{"display":"Email.template.email_confirmation","icon":"check-square","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Account confirmation","message":"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>"}}}',
      type: 'object',
      environment: '',
      tag: ''
    },
    {
      id: 17,
      key: 'plugin_users-permissions_advanced',
      value:
        '{"unique_email":true,"allow_register":true,"email_confirmation":false,"email_confirmation_redirection":"http://localhost:1337/admin","email_reset_password":"http://localhost:1337/admin","default_role":"authenticated"}',
      type: 'object',
      environment: '',
      tag: ''
    },
    {
      id: 15,
      key:
        'plugin_content_manager_configuration_content_types::plugins::users-permissions.user',
      value:
        '{"uid":"plugins::users-permissions.user","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"username","defaultSortBy":"username","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"username":{"edit":{"label":"Username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Username","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Email","searchable":true,"sortable":true}},"provider":{"edit":{"label":"Provider","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Provider","searchable":true,"sortable":true}},"password":{"edit":{"label":"Password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"ResetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"ResetPasswordToken","searchable":true,"sortable":true}},"confirmed":{"edit":{"label":"Confirmed","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Confirmed","searchable":true,"sortable":true}},"blocked":{"edit":{"label":"Blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Blocked","searchable":true,"sortable":true}},"role":{"edit":{"label":"Role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Role","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","username","email","confirmed"],"edit":[[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"confirmed","size":4}],[{"name":"blocked","size":4}]],"editRelations":["role"]}}',
      type: 'object',
      environment: '',
      tag: ''
    },
    {
      id: 11,
      key:
        'plugin_content_manager_configuration_content_types::plugins::users-permissions.permission',
      value:
        '{"uid":"plugins::users-permissions.permission","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"type","defaultSortBy":"type","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"type":{"edit":{"label":"Type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Type","searchable":true,"sortable":true}},"controller":{"edit":{"label":"Controller","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Controller","searchable":true,"sortable":true}},"action":{"edit":{"label":"Action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Action","searchable":true,"sortable":true}},"enabled":{"edit":{"label":"Enabled","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Enabled","searchable":true,"sortable":true}},"policy":{"edit":{"label":"Policy","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Policy","searchable":true,"sortable":true}},"role":{"edit":{"label":"Role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Role","searchable":false,"sortable":false}}},"layouts":{"list":["id","type","controller","action"],"edit":[[{"name":"type","size":6},{"name":"controller","size":6}],[{"name":"action","size":6},{"name":"enabled","size":4}],[{"name":"policy","size":6}]],"editRelations":["role"]}}',
      type: 'object',
      environment: '',
      tag: ''
    },
    {
      id: 18,
      key: 'plugin_email_provider',
      value:
        '{"provider":"sendmail","name":"Sendmail","auth":{"sendmail_default_from":{"label":"Sendmail Default From","type":"text"},"sendmail_default_replyto":{"label":"Sendmail Default Reply-To","type":"text"}}}',
      type: 'object',
      environment: 'staging',
      tag: ''
    },
    {
      id: 19,
      key: 'plugin_email_provider',
      value:
        '{"provider":"sendmail","name":"Sendmail","auth":{"sendmail_default_from":{"label":"Sendmail Default From","type":"text"},"sendmail_default_replyto":{"label":"Sendmail Default Reply-To","type":"text"}}}',
      type: 'object',
      environment: 'development',
      tag: ''
    },
    {
      id: 20,
      key: 'plugin_upload_provider',
      value:
        '{"provider":"local","name":"Local server","enabled":true,"sizeLimit":1000000}',
      type: 'object',
      environment: 'development',
      tag: ''
    },
    {
      id: 14,
      key:
        'plugin_content_manager_configuration_content_types::strapi::administrator',
      value:
        '{"uid":"strapi::administrator","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"username","defaultSortBy":"username","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"username":{"edit":{"label":"Username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Username","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Email","searchable":true,"sortable":true}},"password":{"edit":{"label":"Password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"ResetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"ResetPasswordToken","searchable":true,"sortable":true}},"blocked":{"edit":{"label":"Blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Blocked","searchable":true,"sortable":true}}},"layouts":{"list":["id","username","email","blocked"],"edit":[[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"blocked","size":4}]],"editRelations":[]}}',
      type: 'object',
      environment: '',
      tag: ''
    },
    {
      id: 12,
      key:
        'plugin_content_manager_configuration_content_types::plugins::users-permissions.role',
      value:
        '{"uid":"plugins::users-permissions.role","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":true,"sortable":true}},"type":{"edit":{"label":"Type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Type","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"Permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"type"},"list":{"label":"Permissions","searchable":false,"sortable":false}},"users":{"edit":{"label":"Users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"username"},"list":{"label":"Users","searchable":false,"sortable":false}}},"layouts":{"list":["id","name","description","type"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"type","size":6}]],"editRelations":["permissions","users"]}}',
      type: 'object',
      environment: '',
      tag: ''
    }
  ]);

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
  await knex(adminTableName).insert([
    {
      id: 1,
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD_HASH,
      resetPasswordToken: null,
      blocked: null
    }
  ]);

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
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsPermissionTableName}_action" ON public."${usersPermissionsPermissionTableName}" USING gin (action gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsPermissionTableName}_controller" ON public."${usersPermissionsPermissionTableName}" USING gin (controller gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsPermissionTableName}_policy" ON public."${usersPermissionsPermissionTableName}" USING gin (policy gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsPermissionTableName}_type" ON public."${usersPermissionsPermissionTableName}" USING gin (type gin_trgm_ops);`
  );
  // data
  await knex(usersPermissionsPermissionTableName).insert([
    {
      id: 1,
      type: 'content-type-builder',
      controller: 'componentcategories',
      action: 'editcategory',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 3,
      type: 'content-type-builder',
      controller: 'components',
      action: 'getcomponents',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 2,
      type: 'content-type-builder',
      controller: 'componentcategories',
      action: 'deletecategory',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 4,
      type: 'content-type-builder',
      controller: 'components',
      action: 'getcomponent',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 6,
      type: 'content-type-builder',
      controller: 'components',
      action: 'updatecomponent',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 5,
      type: 'content-type-builder',
      controller: 'components',
      action: 'createcomponent',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 7,
      type: 'content-type-builder',
      controller: 'components',
      action: 'deletecomponent',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 8,
      type: 'content-type-builder',
      controller: 'connections',
      action: 'getconnections',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 9,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'getcontenttypes',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 10,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'getcontenttype',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 11,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'createcontenttype',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 12,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'updatecontenttype',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 13,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'deletecontenttype',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 14,
      type: 'content-manager',
      controller: 'components',
      action: 'listcomponents',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 15,
      type: 'content-manager',
      controller: 'components',
      action: 'findcomponent',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 16,
      type: 'content-manager',
      controller: 'components',
      action: 'updatecomponent',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 17,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'find',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 18,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'findone',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 19,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'count',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 20,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'create',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 21,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'update',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 22,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'delete',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 23,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'deletemany',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 24,
      type: 'content-manager',
      controller: 'contenttypes',
      action: 'listcontenttypes',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 25,
      type: 'content-manager',
      controller: 'contenttypes',
      action: 'findcontenttype',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 26,
      type: 'content-manager',
      controller: 'contenttypes',
      action: 'updatecontenttype',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 27,
      type: 'users-permissions',
      controller: 'auth',
      action: 'callback',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 28,
      type: 'users-permissions',
      controller: 'auth',
      action: 'changepassword',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 29,
      type: 'users-permissions',
      controller: 'auth',
      action: 'connect',
      enabled: true,
      policy: '',
      role: 1
    },
    {
      id: 30,
      type: 'users-permissions',
      controller: 'auth',
      action: 'forgotpassword',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 31,
      type: 'users-permissions',
      controller: 'auth',
      action: 'register',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 32,
      type: 'users-permissions',
      controller: 'auth',
      action: 'emailconfirmation',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 33,
      type: 'users-permissions',
      controller: 'auth',
      action: 'sendemailconfirmation',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 34,
      type: 'users-permissions',
      controller: 'user',
      action: 'find',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 35,
      type: 'users-permissions',
      controller: 'user',
      action: 'me',
      enabled: true,
      policy: '',
      role: 1
    },
    {
      id: 36,
      type: 'users-permissions',
      controller: 'user',
      action: 'findone',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 37,
      type: 'users-permissions',
      controller: 'user',
      action: 'create',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 38,
      type: 'users-permissions',
      controller: 'user',
      action: 'update',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 39,
      type: 'users-permissions',
      controller: 'user',
      action: 'destroy',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 40,
      type: 'users-permissions',
      controller: 'user',
      action: 'destroyall',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 41,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'createrole',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 42,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'deleteprovider',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 43,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'deleterole',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 44,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getpermissions',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 45,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getpolicies',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 46,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getrole',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 47,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getroles',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 48,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getroutes',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 49,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'index',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 50,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'init',
      enabled: true,
      policy: '',
      role: 1
    },
    {
      id: 51,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'searchusers',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 52,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'updaterole',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 53,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getemailtemplate',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 54,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'updateemailtemplate',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 55,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getadvancedsettings',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 56,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'updateadvancedsettings',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 57,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getproviders',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 58,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'updateproviders',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 59,
      type: 'email',
      controller: 'email',
      action: 'send',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 60,
      type: 'email',
      controller: 'email',
      action: 'getenvironments',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 61,
      type: 'email',
      controller: 'email',
      action: 'getsettings',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 62,
      type: 'email',
      controller: 'email',
      action: 'updatesettings',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 63,
      type: 'upload',
      controller: 'upload',
      action: 'upload',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 64,
      type: 'upload',
      controller: 'upload',
      action: 'getenvironments',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 65,
      type: 'upload',
      controller: 'upload',
      action: 'getsettings',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 66,
      type: 'upload',
      controller: 'upload',
      action: 'updatesettings',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 67,
      type: 'upload',
      controller: 'upload',
      action: 'find',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 68,
      type: 'upload',
      controller: 'upload',
      action: 'findone',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 69,
      type: 'upload',
      controller: 'upload',
      action: 'count',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 70,
      type: 'upload',
      controller: 'upload',
      action: 'destroy',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 71,
      type: 'upload',
      controller: 'upload',
      action: 'search',
      enabled: false,
      policy: '',
      role: 1
    },
    {
      id: 72,
      type: 'content-type-builder',
      controller: 'componentcategories',
      action: 'editcategory',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 73,
      type: 'content-type-builder',
      controller: 'componentcategories',
      action: 'deletecategory',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 74,
      type: 'content-type-builder',
      controller: 'components',
      action: 'getcomponents',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 75,
      type: 'content-type-builder',
      controller: 'components',
      action: 'getcomponent',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 76,
      type: 'content-type-builder',
      controller: 'components',
      action: 'createcomponent',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 77,
      type: 'content-type-builder',
      controller: 'components',
      action: 'updatecomponent',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 78,
      type: 'content-type-builder',
      controller: 'components',
      action: 'deletecomponent',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 79,
      type: 'content-type-builder',
      controller: 'connections',
      action: 'getconnections',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 80,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'getcontenttypes',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 81,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'getcontenttype',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 82,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'createcontenttype',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 83,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'updatecontenttype',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 84,
      type: 'content-type-builder',
      controller: 'contenttypes',
      action: 'deletecontenttype',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 85,
      type: 'content-manager',
      controller: 'components',
      action: 'listcomponents',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 91,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'create',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 92,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'update',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 93,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'delete',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 94,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'deletemany',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 95,
      type: 'content-manager',
      controller: 'contenttypes',
      action: 'listcontenttypes',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 86,
      type: 'content-manager',
      controller: 'components',
      action: 'findcomponent',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 96,
      type: 'content-manager',
      controller: 'contenttypes',
      action: 'findcontenttype',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 106,
      type: 'users-permissions',
      controller: 'user',
      action: 'me',
      enabled: true,
      policy: '',
      role: 2
    },
    {
      id: 117,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getrole',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 126,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getadvancedsettings',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 136,
      type: 'upload',
      controller: 'upload',
      action: 'getsettings',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 87,
      type: 'content-manager',
      controller: 'components',
      action: 'updatecomponent',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 97,
      type: 'content-manager',
      controller: 'contenttypes',
      action: 'updatecontenttype',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 109,
      type: 'users-permissions',
      controller: 'user',
      action: 'update',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 119,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getroutes',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 129,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'updateproviders',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 139,
      type: 'upload',
      controller: 'upload',
      action: 'findone',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 88,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'find',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 99,
      type: 'users-permissions',
      controller: 'auth',
      action: 'changepassword',
      enabled: true,
      policy: '',
      role: 2
    },
    {
      id: 108,
      type: 'users-permissions',
      controller: 'user',
      action: 'create',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 116,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getpolicies',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 128,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getproviders',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 138,
      type: 'upload',
      controller: 'upload',
      action: 'find',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 89,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'findone',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 98,
      type: 'users-permissions',
      controller: 'auth',
      action: 'callback',
      enabled: true,
      policy: '',
      role: 2
    },
    {
      id: 107,
      type: 'users-permissions',
      controller: 'user',
      action: 'findone',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 118,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getroles',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 127,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'updateadvancedsettings',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 137,
      type: 'upload',
      controller: 'upload',
      action: 'updatesettings',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 90,
      type: 'content-manager',
      controller: 'contentmanager',
      action: 'count',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 100,
      type: 'users-permissions',
      controller: 'auth',
      action: 'connect',
      enabled: true,
      policy: '',
      role: 2
    },
    {
      id: 110,
      type: 'users-permissions',
      controller: 'user',
      action: 'destroy',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 120,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'index',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 130,
      type: 'email',
      controller: 'email',
      action: 'send',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 140,
      type: 'upload',
      controller: 'upload',
      action: 'count',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 101,
      type: 'users-permissions',
      controller: 'auth',
      action: 'forgotpassword',
      enabled: true,
      policy: '',
      role: 2
    },
    {
      id: 111,
      type: 'users-permissions',
      controller: 'user',
      action: 'destroyall',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 121,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'init',
      enabled: true,
      policy: '',
      role: 2
    },
    {
      id: 131,
      type: 'email',
      controller: 'email',
      action: 'getenvironments',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 141,
      type: 'upload',
      controller: 'upload',
      action: 'destroy',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 102,
      type: 'users-permissions',
      controller: 'auth',
      action: 'register',
      enabled: true,
      policy: '',
      role: 2
    },
    {
      id: 112,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'createrole',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 122,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'searchusers',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 132,
      type: 'email',
      controller: 'email',
      action: 'getsettings',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 142,
      type: 'upload',
      controller: 'upload',
      action: 'search',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 103,
      type: 'users-permissions',
      controller: 'auth',
      action: 'emailconfirmation',
      enabled: true,
      policy: '',
      role: 2
    },
    {
      id: 113,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'deleteprovider',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 123,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'updaterole',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 133,
      type: 'email',
      controller: 'email',
      action: 'updatesettings',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 104,
      type: 'users-permissions',
      controller: 'auth',
      action: 'sendemailconfirmation',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 114,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'deleterole',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 124,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getemailtemplate',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 134,
      type: 'upload',
      controller: 'upload',
      action: 'upload',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 105,
      type: 'users-permissions',
      controller: 'user',
      action: 'find',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 115,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'getpermissions',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 125,
      type: 'users-permissions',
      controller: 'userspermissions',
      action: 'updateemailtemplate',
      enabled: false,
      policy: '',
      role: 2
    },
    {
      id: 135,
      type: 'upload',
      controller: 'upload',
      action: 'getenvironments',
      enabled: false,
      policy: '',
      role: 2
    }
  ]);

  // users-permissions_role
  // columns
  await knex.schema.createTable(usersPermissionsRoleTableName, table => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('description', 255);
    table.string('type', 255).unique();
  });
  // indices
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsRoleTableName}_description" ON public."${usersPermissionsRoleTableName}" USING gin (description gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsRoleTableName}_name" ON public."${usersPermissionsRoleTableName}" USING gin (name gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsRoleTableName}_type" ON public."${usersPermissionsRoleTableName}" USING gin (type gin_trgm_ops);`
  );
  await knex(usersPermissionsRoleTableName).insert([
    {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated'
    },
    {
      id: 2,
      name: 'Public',
      description: 'Default role given to unauthenticated user.',
      type: 'public'
    }
  ]);

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
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsUserTableName}_provider" ON public."${usersPermissionsUserTableName}" USING gin (provider gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsUserTableName}_resetPasswordToken" ON public."${usersPermissionsUserTableName}" USING gin ("resetPasswordToken" gin_trgm_ops);`
  );
  await knex.raw(
    `CREATE INDEX "search_${usersPermissionsUserTableName}_username" ON public."${usersPermissionsUserTableName}" USING gin (username gin_trgm_ops);`
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
};
