import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_ALL_TODOS = gql`
  query {
    countries {
      name
    }
  }
`;

export const UsingApolloNextAppClient = () => {
  const { loading, error, data } = useQuery(GET_ALL_TODOS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      { data.countries.map((country: {name: string}) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  )
}