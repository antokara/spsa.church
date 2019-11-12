/**
 * data structure for the "theme" graphql.
 * should be used like so useQuery<TData>(getTheme)
 */
type TData = {
  theme: {
    headerMenu: {
      label: string;
      menuEntries: [
        {
          label: string;
          url: string;
        }
      ];
    };
  };
};

export { TData };
