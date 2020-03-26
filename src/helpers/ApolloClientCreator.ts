import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { PersistentStorage } from 'apollo-cache-persist/types';
import { ApolloClient as Client } from 'apollo-client';
import { ApolloLink, GraphQLRequest } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import DebounceLink from 'apollo-link-debounce';
import { createHttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import localforage from 'localforage';
import introspectionResult from 'src/gql/introspection/introspectionResult';

// the type of our apollo client with the cache structure
// TODO: properly use a cache structure and test it
type TApolloClient = Client<{}>;

/**
 * context of the auth link
 */
interface IContext {
  headers: {
    authorization: string;
  };
}

/**
 * creates the apollo client asynchronously in the promise returned
 */
const ApolloClientCreator: () => Promise<TApolloClient> = async (): Promise<
  TApolloClient
> => {
  // TODO test
  const fragmentMatcher: IntrospectionFragmentMatcher = new IntrospectionFragmentMatcher(
    {
      introspectionQueryResultData: introspectionResult,
    }
  );
  const cache: InMemoryCache = new InMemoryCache({
    fragmentMatcher,
  });
  // TODO test
  // TODO implement cache invalidation on data update
  const store: LocalForage = localforage.createInstance({
    name: 'apollo-cache',
    version: 1,
  });

  /**
   * instantiates the cache persistor
   *
   * @see https://github.com/apollographql/apollo-cache-persist#using-cachepersistor
   */
  await persistCache({
    cache,
    storage: <PersistentStorage<NormalizedCacheObject>>store,
  });

  /**
   * handles authorization / headers
   */
  const authLink: ApolloLink = setContext(
    (operation: GraphQLRequest, prevContext: IContext): IContext => ({
      headers: {
        ...prevContext.headers,
        authorization: `Bearer ${process.env.TAKESHAPE_API_KEY}`,
      },
    })
  );

  /**
   * handles https requests
   */
  const httpLink: ApolloLink = createHttpLink({
    uri: process.env.TAKESHAPE_API_URL,
  });

  /**
   * automatically retries in case of network/api failure
   */
  // TODO test
  const retryLink: RetryLink = new RetryLink({
    attempts: { max: 1 },
  });

  /**
   * make sure we do not spam the graphQL server
   */
  const dounceLink: DebounceLink = new DebounceLink(100);

  return new Client({
    link: ApolloLink.from([dounceLink, authLink, retryLink, httpLink]),
    cache,
    defaultOptions: {
      // TODO test
      query: {
        fetchPolicy: 'cache-first',
      },
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
};

export { ApolloClientCreator, TApolloClient };
