// import { ApolloClient as Client, ApolloQueryResult } from 'apollo-client';
// import * as fetchMock from 'fetch-mock';
// import * as gql from 'graphql-tag';

// describe('ApolloClient object', () => {
//   let ApolloClient: Client<{}>;

//   beforeAll(() => {
//     fetchMock.reset();
//   });
//   afterAll(() => {
//     fetchMock.reset();
//   });

//   beforeEach(async () => {
//     ({ ApolloClient } = await import('./ApolloClientCreator'));
//   });

//   describe('properties', () => {
//     it('has the "constructor.name"', () => {
//       expect(ApolloClient.constructor).toHaveProperty('name', 'ApolloClient');
//     });
//   });

//   describe('methods', () => {
//     it('has the "watchQuery"', () => {
//       expect(ApolloClient).toHaveProperty('watchQuery', expect.any(Function));
//     });

//     describe('query', () => {
//       it('exists', () => {
//         expect(ApolloClient).toHaveProperty('query', expect.any(Function));
//       });

//       describe('invoking it', () => {
//         type TData = {
//           test: string;
//         };
//         type TQuery = {
//           operationName: string;
//           query: string;
//           variables: {};
//         };
//         let result: Promise<ApolloQueryResult<TData>>;

//         beforeEach(() => {
//           fetchMock.mock({
//             matcher: (url: string, opts: fetchMock.MockRequest): boolean => {
//               if (typeof opts.body === 'string') {
//                 // parse the request body
//                 const requestBody: TQuery = JSON.parse(opts.body);

//                 // test the request body
//                 expect(requestBody).toHaveProperty('operationName', 'getTest');
//                 expect(requestBody).toHaveProperty('variables', {});
//                 expect(requestBody.query.replace(/[\s\n\r]+/g, ' ')).toMatch(
//                   'query getTest { test }'
//                 );

//                 // check the headers
//                 if (opts.headers) {
//                   Object.entries(opts.headers).forEach(
//                     (
//                       // tslint:disable-next-line:no-any
//                       value: [string, any],
//                       index: number,
//                       // tslint:disable-next-line:no-any
//                       array: [string, any][]
//                     ): void => {
//                       if (value[0] === 'accept') {
//                         expect(value[1]).toMatch('*/*');
//                       } else if (value[0] === 'authorization') {
//                         expect(value[1]).toMatch(
//                           `Bearer ${process.env.TAKESHAPE_API_KEY}`
//                         );
//                       } else if (value[0] === 'content-type') {
//                         expect(value[1]).toMatch('application/json');
//                       }
//                     }
//                   );
//                 }

//                 // check request type
//                 expect(opts.method).toMatch('POST');

//                 // check request URL
//                 if (process.env.TAKESHAPE_API_URL) {
//                   expect(url).toMatch(process.env.TAKESHAPE_API_URL);
//                 }

//                 return true;
//               }

//               return false;
//             },
//             response: {
//               data: {
//                 test: 'rest-response'
//               }
//             }
//           });

//           result = ApolloClient.query({
//             fetchPolicy: 'no-cache',
//             query: gql.default('query getTest { test }')
//           });
//         });

//         it('returns a Promise', () => {
//           expect(result).toBeInstanceOf(Promise);
//         });

//         it('the request matches', () => {
//           expect.assertions(8);
//         });

//         describe('resolved', () => {
//           let resolvedResult: ApolloQueryResult<TData>;
//           beforeEach(async () => {
//             resolvedResult = await result;
//           });

//           it('sets loading to false', () => {
//             expect(resolvedResult.loading).toBeFalsy();
//           });

//           it('returns data', () => {
//             expect(resolvedResult.data).toStrictEqual({
//               test: 'rest-response'
//             });
//           });
//         });
//       });
//     });

//     it('has the "mutate"', () => {
//       expect(ApolloClient).toHaveProperty('mutate', expect.any(Function));
//     });

//     it('has the "subscribe"', () => {
//       expect(ApolloClient).toHaveProperty('subscribe', expect.any(Function));
//     });

//     it('has the "readQuery"', () => {
//       expect(ApolloClient).toHaveProperty('readQuery', expect.any(Function));
//     });

//     it('has the "readFragment"', () => {
//       expect(ApolloClient).toHaveProperty('readFragment', expect.any(Function));
//     });

//     it('has the "writeQuery"', () => {
//       expect(ApolloClient).toHaveProperty('writeQuery', expect.any(Function));
//     });

//     it('has the "writeFragment"', () => {
//       expect(ApolloClient).toHaveProperty(
//         'writeFragment',
//         expect.any(Function)
//       );
//     });

//     it('has the "resetStore"', () => {
//       expect(ApolloClient).toHaveProperty('resetStore', expect.any(Function));
//     });

//     it('has the "onResetStore"', () => {
//       expect(ApolloClient).toHaveProperty('onResetStore', expect.any(Function));
//     });

//     it('has the "clearStore"', () => {
//       expect(ApolloClient).toHaveProperty('clearStore', expect.any(Function));
//     });

//     it('has the "onClearStore"', () => {
//       expect(ApolloClient).toHaveProperty('onClearStore', expect.any(Function));
//     });

//     it('has the "stop"', () => {
//       expect(ApolloClient).toHaveProperty('stop', expect.any(Function));
//     });

//     it('has the "reFetchObservableQueries"', () => {
//       expect(ApolloClient).toHaveProperty(
//         'reFetchObservableQueries',
//         expect.any(Function)
//       );
//     });
//   });
// });
