/**
 * data structure for the "getNewsPage" graphql.
 * should be used like so useQuery<TData>(getNewsPage, {variables: { id: _id } });
 */
type TData = {
  getNewsPage: {
    contentHtml: string;
  };
};

export { TData };
