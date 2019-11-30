/**
 * data structure for the "home" graphql.
 * should be used like so useQuery<TData>(getHome, {variables: { id: _id } });
 */
type TData = {
  getHomePage: {
    contentHtml: string;
    calendarUrl: string;
  };
};

export { TData };
