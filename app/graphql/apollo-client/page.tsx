// using https://www.npmjs.com/package/@apollo/client

'use client'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {UsingApolloClient} from './UsingApolloClient';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});


export default function GraphQLApolloClient() {
  return (
    <ApolloProvider client={client}>
      <div>Countries:</div>
      <UsingApolloClient />
    </ApolloProvider>
  );
}