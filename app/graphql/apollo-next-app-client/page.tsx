// using https://www.npmjs.com/package/@apollo/experimental-nextjs-app-support

// set up a local mock server at localhost:4000 to test these:
// https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api#the-example-api

"use client";

import { ApolloWrapper } from "./ApolloWrapper";
import { UsingApolloNextAppClient } from "./UsingApolloNextAppClient";

export default function GraphQLApolloNextAppClient() {
  return (
    <ApolloWrapper>
      <div>Countries</div>
      <UsingApolloNextAppClient />
    </ApolloWrapper>
  );
}
