import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient as Client } from 'apollo-client';
import { ApolloLink, GraphQLRequest } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { withClientState } from 'apollo-link-state';

interface IContext {
  headers: {
    authorization: string;
  };
}

/**
 * our cache
 */
const cache: InMemoryCache = new InMemoryCache();

/**
 * handles local state
 */
const stateLink: ApolloLink = withClientState({
  cache,
  resolvers: {
    Mutation: {}
  },
  defaults: {}
});

/**
 * handles authentication
 */
const authLink: ApolloLink = setContext(
  (operation: GraphQLRequest, prevContext: IContext): IContext => ({
    headers: {
      ...prevContext.headers,
      authorization: `Bearer ${process.env.TAKESHAPE_API_KEY}`
    }
  })
);

/**
 * handles http requests
 */
const httpLink: ApolloLink = createHttpLink({
  uri: process.env.TAKESHAPE_API_URL
});

// TODO: consider replacing or using additional to this the "apollo-link-error"
//    for controlled retry by the user after the automatic failures
//    or for controlled retry of faster retries (instead of forced delay)
// TODO: add test for the retry in its final form
const retryLink: RetryLink = new RetryLink();

const ApolloClient: Client<{}> = new Client({
  link: ApolloLink.from([authLink, retryLink, stateLink, httpLink]),
  cache
});

// TODO: fix when bug is fixed
// @see https://github.com/apollographql/apollo-link/issues/1200
// ApolloClient.onResetStore(stateLink.writeDefaults);

export { ApolloClient };
