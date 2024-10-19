import { Suspense } from "react";
import ServerComponentExample from "./ServerComponentExample";
import { ApolloWrapper } from "./ApolloWrapper";
//Server component page example
export default function ApolloServerComponent() {
  return (
    <>
      <ApolloWrapper>
        <h1>Server component fetching</h1>
        <Suspense fallback={<p>Loading counties...</p>}>
          <ServerComponentExample />
        </Suspense>
      </ApolloWrapper>
    </>
  );
}
