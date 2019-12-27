exports.data = [
  {
    key: 'db_model_pages',
    value:
      '{"key":{"type":"string","unique":true},"URL":{"type":"string","required":true,"unique":true},"Title":{"type":"string"},"Enabled":{"type":"boolean","default":true,"required":true},"Content":{"type":"dynamiczone","components":["content.calendar","content.content"]},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}',
    type: 'object',
    environment: null,
    tag: null
  },
  {
    key:
      'plugin_content_manager_configuration_content_types::application::page.page',
    value:
      '{"uid":"application::page.page","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"key","defaultSortBy":"key","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"key":{"edit":{"label":"Key","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Key","searchable":true,"sortable":true}},"URL":{"edit":{"label":"URL","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"URL","searchable":true,"sortable":true}},"Title":{"edit":{"label":"Title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Title","searchable":true,"sortable":true}},"Enabled":{"edit":{"label":"Enabled","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Enabled","searchable":true,"sortable":true}},"Content":{"edit":{"label":"Content","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Content","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","key","created_at","updated_at"],"edit":[[{"name":"key","size":6},{"name":"URL","size":6}],[{"name":"Title","size":6}],[{"name":"Content","size":12}],[{"name":"Enabled","size":4}]],"editRelations":[]}}',
    type: 'object',
    environment: '',
    tag: ''
  },
  {
    key: 'db_model_components_content_contents',
    value: '{"Content":{"type":"richtext","required":true}}',
    type: 'object',
    environment: null,
    tag: null
  },
  {
    key: 'plugin_content_manager_configuration_components::content.content',
    value:
      '{"uid":"content.content","isComponent":true,"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"Content":{"edit":{"label":"Content","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Content","searchable":false,"sortable":false}}},"layouts":{"list":["id"],"edit":[[{"name":"Content","size":12}]],"editRelations":[]}}',
    type: 'object',
    environment: '',
    tag: ''
  },
  {
    key: 'db_model_components_content_calendars',
    value: '{"URL":{"type":"string","required":true}}',
    type: 'object',
    environment: null,
    tag: null
  },
  {
    key: 'plugin_content_manager_configuration_components::content.calendar',
    value:
      '{"uid":"content.calendar","isComponent":true,"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"URL","defaultSortBy":"URL","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"URL":{"edit":{"label":"URL","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"URL","searchable":true,"sortable":true}}},"layouts":{"list":["id","URL"],"edit":[[{"name":"URL","size":6}]],"editRelations":[]}}',
    type: 'object',
    environment: '',
    tag: ''
  }
];
