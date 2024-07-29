import { useQuery } from "@apollo/client"
import {
  AppShell,
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  Group,
  Loader,
  Progress,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"
import { Path } from "../Path"
import { PokemonStaticData } from "../PokemonStaticData"
import { gql } from "../graphql"
import { type PokemonType, PokemonTypeColors } from "../types/PokemonType"
import { PokedexTitle } from "./PokedexTitle"
import { PokemonCard } from "./PokemonCard"
import { PokemonFavoriteButton } from "./PokemonFavoriteButton"
import { PokemonImage } from "./PokemonImage"

const ColorSchemeButton = dynamic(() => import("./ColorSchemeButton"), {
  ssr: false,
})
const PokemonAudioButton = dynamic(() => import("./PokemonAudioButton"), {
  ssr: false,
})

const PokemonQuery = gql(/* GraphQL */ `
  query Pokemon($name: String!) {
    pokemonByName(name: $name) {
      maxHP
      maxCP
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      evolutions {
        ...PokemonBase
      }
      ...PokemonBase
    }
  }
`)

export const PokemonDetail = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>() || {}

  const { data, loading } = useQuery(PokemonQuery, {
    variables: {
      name: pokemonName,
    },
    skip: !pokemonName,
  })

  const pokemon = data?.pokemonByName

  return (
    <AppShell
      header={{
        height: 60,
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <PokedexTitle />
          <ColorSchemeButton />
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {loading ? (
          <Flex align="center" justify="center" h={rem(400)} flex={1}>
            <Loader color="red" />
          </Flex>
        ) : pokemon == null ? (
          <Container size="xs" mt="xl" mb="xl">
            <Text ta="center">Pokemon not found</Text>
          </Container>
        ) : (
          <>
            <Container size="xs" mt="xl" mb="xl">
              <PokemonImage {...pokemon} />

              <Group justify="space-between" mt="md" gap="xs" wrap="nowrap">
                <Title>{pokemon.name}</Title>
                <Group w={rem(36)} justify="center">
                  <PokemonFavoriteButton {...pokemon} />
                </Group>
              </Group>

              <Group justify="space-between" mt="md">
                <Group gap="xs">
                  {pokemon.types.map((type) => (
                    <Link
                      key={type}
                      href={Path.Pokedex({ type: type as PokemonType })}
                    >
                      <Badge
                        color={PokemonTypeColors[type as PokemonType]}
                        size="lg"
                      >
                        {type}
                      </Badge>
                    </Link>
                  ))}
                </Group>
                <PokemonAudioButton id={pokemon.id} />
              </Group>

              <Stack mt="md">
                <Progress.Root size="xl">
                  <Progress.Section
                    color="violet"
                    value={(pokemon.maxCP / PokemonStaticData.maxCP) * 100}
                  >
                    <Progress.Label>CP: {pokemon.maxCP}</Progress.Label>
                  </Progress.Section>
                </Progress.Root>

                <Progress.Root size="xl">
                  <Progress.Section
                    color="green"
                    value={(pokemon.maxHP / PokemonStaticData.maxHP) * 100}
                  >
                    <Progress.Label>HP: {pokemon.maxHP}</Progress.Label>
                  </Progress.Section>
                </Progress.Root>
              </Stack>

              <Group mt="xl">
                <Stack gap="xs" flex={1}>
                  <Title order={4} ta="center">
                    Height
                  </Title>
                  <Text ta="center">
                    {pokemon.height.minimum} - {pokemon.height.maximum}
                  </Text>
                </Stack>
                <Stack gap="xs" flex={1}>
                  <Title order={4} ta="center">
                    Weight
                  </Title>
                  <Text ta="center">
                    {pokemon.weight.minimum} - {pokemon.weight.maximum}
                  </Text>
                </Stack>
              </Group>
            </Container>

            {pokemon.evolutions.length > 0 && (
              <>
                <Divider />

                <Container py="xl">
                  <Title ta="center">Evolutions</Title>

                  <Group mt="md" gap="md" justify="center">
                    {pokemon.evolutions.map((evolution) => (
                      <Box
                        key={evolution.name}
                        flex={1}
                        w={rem(500)}
                        maw={{
                          base: undefined,
                          sm: "50%",
                        }}
                      >
                        <PokemonCard {...evolution} />
                      </Box>
                    ))}
                  </Group>
                </Container>
              </>
            )}
          </>
        )}
      </AppShell.Main>
    </AppShell>
  )
}
