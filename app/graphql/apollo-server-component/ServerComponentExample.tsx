import { gql } from "@apollo/client";
import { getClient } from "./ApolloClient";

const GET_ALL_TODOS = gql`
  query {
    countries {
      name
    }
  }
`;
//This is true Server Component
export default async function ServerComponentExample() {
  const { data } = await getClient().query({ query: GET_ALL_TODOS });
  return (
    <ul>
      {data.countries.map((country: { name: string }) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}
