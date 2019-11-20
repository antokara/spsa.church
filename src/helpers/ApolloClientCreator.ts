import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
// tslint:disable-next-line:no-submodule-imports
import { PersistentStorage } from 'apollo-cache-persist/types';
import { ApolloClient as Client } from 'apollo-client';
import { ApolloLink, GraphQLRequest, Operation } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import * as localforage from 'localforage';

// the type of our apollo client with the cache structure
type TApolloClient = Client<{}>;

interface IContext {
  headers: {
    authorization: string;
  };
}

const ApolloClientCreator: () => Promise<
  TApolloClient
> = async (): Promise<TApolloClient> => {
  // TODO: add test
  const cache: InMemoryCache = new InMemoryCache();
  const store: LocalForage = localforage.createInstance({
    name: 'apollo-cache',
    version: 1
  });

  // TODO: add test
  /**
   * instantiates the cache persistor
   *
   * @see https://github.com/apollographql/apollo-cache-persist#using-cachepersistor
   */
  await persistCache({
    cache,
    storage: <PersistentStorage<NormalizedCacheObject>>store
  });

  /**
   * handles authorization / headers
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
   * handles https requests
   */
  const httpLink: ApolloLink = createHttpLink({
    uri: process.env.TAKESHAPE_API_URL
  });

  // TODO: consider replacing or using additional to this the "apollo-link-error"
  //    for controlled retry by the user after the automatic failures
  //    or for controlled retry of faster retries (instead of forced delay)
  // TODO: add test for the retry in its final form
  const retryLink: RetryLink = new RetryLink({
    attempts: { max: Infinity }
  });
  // .split(
  //   // split based on operation type
  //   (op: Operation): boolean => {
  //     // const { kind, operation } = query as any;
  //     op.operationName
  //     // return kind === 'OperationDefinition' && operation === 'subscription';
  //     return true;
  //   },
  //   httpLink
  // );

  return new Client({
    link: ApolloLink.from([authLink, retryLink, httpLink]),
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first'
      },
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    }
  });
};

export { ApolloClientCreator, TApolloClient };
