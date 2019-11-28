/**
 * data structure for the "home" graphql.
 * should be used like so useQuery<TData>(getHome)
 */
type TData = {
  home: {
    content: string;
    calendarUrl: string;
  };
};

export { TData };
