/**
 * data structure for the "generic" graphql.
 * should be used like so useQuery<TData>(getGeneric, {variables: { id: _id } });
 */
type TData = {
  getGenericPage: {
    contentHtml: string;
  };
};

export { TData };
