type TGenericPage = {
  content: string;
};

/**
 * data structure for the "generic" graphql.
 * should be used like so useQuery<TData>(getGeneric, {variables: { url: '/donate' } });
 */
type TData = {
  getGenericPageList: {
    items: TGenericPage[];
  };
};

export { TData, TGenericPage };
