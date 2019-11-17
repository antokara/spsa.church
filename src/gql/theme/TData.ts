type TMenuEntry = {
  _id: string;
  label: string;
  url: string;
};

/**
 * data structure for the "theme" graphql.
 * should be used like so useQuery<TData>(getTheme)
 */
type TData = {
  theme: {
    headerMenu: {
      label: string;
      menuEntries: TMenuEntry[];
    };
  };
};

export { TData, TMenuEntry };
