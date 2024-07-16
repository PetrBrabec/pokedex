import { useQuery } from "@apollo/client"
import { Box, Group, Image, Stack, Title } from "@mantine/core"
import { useParams } from "next/navigation"
import React from "react"
import { gql } from "../graphql"

const PokemonQuery = gql(/* GraphQL */ `
  query Pokemon($name: String!) {
    pokemonByName(name: $name) {
      ...PokemonBase
    }
  }
`)

export default function IndexPage() {
  const { pokemonName } = useParams<{ pokemonName: string }>() || {}

  const { loading, data } = useQuery(PokemonQuery, {
    variables: {
      name: pokemonName,
    },
  })

  const pokemon = data?.pokemonByName

  return (
    <Group mt={50} justify="center">
      {pokemon && (
        <Stack>
          <Title ta="center">{pokemon.name}</Title>
          <Box>
            <Image
              width="100%"
              src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemon.id}.png`}
              alt={pokemon.name}
            />
          </Box>
        </Stack>
      )}
    </Group>
  )
}
