import { Box, Group } from "@mantine/core"
import { gql } from "../graphql"
import { useQuery } from "@apollo/client"
import Link from "next/link"

const PokemonsQuery = gql(/* GraphQL */ `
  query Pokemons($limit: Int!) {
    pokemons(query: { limit: $limit, offset: 0 }) {
      edges {
        id
        name
      }
    }
  }
`)

export default function IndexPage() {
  const { loading, data } = useQuery(PokemonsQuery, {
    variables: {
      limit: 12,
    },
  })

  return (
    <Group mt={50} justify="center">
      {data?.pokemons.edges.map((edge) => (
        <Link key={edge.id} href={`/pokemon/${edge.id}`}>
          <Box>{edge.name}</Box>
        </Link>
      ))}
    </Group>
  )
}
