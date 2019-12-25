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
      username: 'admin',
      email: 'antokarag@gmail.com',
      password: '$2a$10$TEVX9NYoECrQhpO5QaHz/OwaCdTqljNuLu.EeuJzGoqlByPYMuPga',
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
