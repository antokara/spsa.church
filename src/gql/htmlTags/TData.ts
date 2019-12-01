type THtmlTagItem = {
  tag: string;
  html: string;
};

/**
 * data structure for the "getHtmlTagList" graphql.
 * should be used like so useQuery<TData>(getHtmlTagList);
 */
type TData = {
  getHtmlTagList: {
    items: THtmlTagItem[];
  };
};

export { TData, THtmlTagItem };
