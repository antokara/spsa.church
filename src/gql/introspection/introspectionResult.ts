
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "TSSearchable",
        "possibleTypes": [
          {
            "name": "BaseAsset"
          },
          {
            "name": "Asset"
          },
          {
            "name": "IconLink"
          },
          {
            "name": "Theme"
          },
          {
            "name": "Menu"
          },
          {
            "name": "MenuEntry"
          },
          {
            "name": "GenericPage"
          },
          {
            "name": "HomePage"
          },
          {
            "name": "TsStaticSite"
          },
          {
            "name": "HtmlTag"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "UndefinedReference",
        "possibleTypes": [
          {
            "name": "IconLink"
          },
          {
            "name": "Theme"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "MenuEntryPage",
        "possibleTypes": [
          {
            "name": "GenericPage"
          },
          {
            "name": "HomePage"
          }
        ]
      }
    ]
  }
};
      export default result;
    