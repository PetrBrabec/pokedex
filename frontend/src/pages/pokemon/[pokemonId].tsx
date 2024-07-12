import { Box, Group, Image, Stack, Title } from "@mantine/core"
import { gql } from "../../graphql"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"

const PokemonQuery = gql(/* GraphQL */ `
  query Pokemon($id: ID!) {
    pokemonById(id: $id) {
      id
      name
      image
    }
  }
`)

export default function IndexPage() {
  const { pokemonId } = useParams<{ pokemonId: string }>()

  const { loading, data } = useQuery(PokemonQuery, {
    variables: {
      id: pokemonId,
    },
  })

  return (
    <Group mt={50} justify="center">
      {data?.pokemonById && (
        <Stack>
          <Title ta="center">{data.pokemonById.name}</Title>
          <Box>
            <Image
              width="100%"
              src={data.pokemonById.image}
              alt={data.pokemonById.name}
            />
          </Box>
        </Stack>
      )}
    </Group>
  )
}