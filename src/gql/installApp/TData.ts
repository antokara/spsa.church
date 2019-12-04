/**
 * data structure for the "installApp" graphql.
 * should be used like so useQuery<TData>(getinstallApp, {variables: { id: _id } });
 */
type TData = {
  getInstallAppPage: {
    contentHtml: string;
  };
};

export { TData };
