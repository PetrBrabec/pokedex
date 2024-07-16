import { useQuery } from "@apollo/client"
import {
  ActionIcon,
  Anchor,
  AppShell,
  Box,
  Center,
  Container,
  Group,
  Indicator,
  Pagination,
  ScrollArea,
  Switch,
  Text,
  TextInput,
  rem,
} from "@mantine/core"
import { useDisclosure, useLocalStorage } from "@mantine/hooks"
import {
  IconBrandGitlab,
  IconFilter,
  IconHeart,
  IconHeartFilled,
  IconSearch,
} from "@tabler/icons-react"
import dynamic from "next/dynamic"
import { useCallback, useMemo, useState } from "react"
import { gql } from "../graphql"
import { PokemonsGallery } from "./PokemonsGallery"

const ColorSchemeButton = dynamic(() => import("./ColorSchemeButton"), {
  ssr: false,
})
import { PokedexFiltersContext } from "../PokedexFiltersContext"
import { useMobileView } from "../hooks/useMobileView"
import type { PokemonType } from "../types/PokemonType"
import { PokedexFilters } from "./PokedexFilters"
import { PokedexTitle } from "./PokedexTitle"
import { PokemonsList } from "./PokemonsList"

const PokemonsQuery = gql(/* GraphQL */ `
  query Pokemons(
    $limit: Int!
    $offset: Int
    $search: String
    $isFavorite: Boolean
    $type: String
    $weakness: String
    $resistance: String
  ) {
    pokemons(
      query: {
        limit: $limit
        offset: $offset
        filter: {
          isFavorite: $isFavorite
          type: $type
          weakness: $weakness
          resistance: $resistance
        }
        search: $search
      }
    ) {
      edges {
        ...PokemonBase
      }
      count
    }
  }
`)

export type PokedexView = "gallery" | "list"

export function Pokedex() {
  const isMobileView = useMobileView()
  const [view, setView] = useLocalStorage<PokedexView>({
    key: "pokedex-view",
    defaultValue: "gallery",
  })
  const [pokemonType, setPokemonType] = useState<PokemonType | null>(null)
  const [pokemonWeakness, setPokemonWeakness] = useState<PokemonType | null>(
    null
  )
  const [pokemonResistance, setPokemonResistance] =
    useState<PokemonType | null>(null)
  const [search, setSearch] = useState("")
  const [filtersOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure()

  const isFilterActive = useMemo(
    () =>
      pokemonType !== null ||
      pokemonWeakness !== null ||
      pokemonResistance !== null,
    [pokemonType, pokemonWeakness, pokemonResistance]
  )

  const perPage = 24
  const [page, setPage] = useState(1)
  const handleSetPage = useCallback((page: number) => {
    setPage(page)
    window.scrollTo(0, 0)
  }, [])
  const [
    showFavorite,
    {
      toggle: toggleFavorite,
      close: disableFavoriteFilter,
      open: enableFavoriteFilter,
    },
  ] = useDisclosure()

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite()
    setPage(1)
  }, [toggleFavorite])

  const { loading, data } = useQuery(PokemonsQuery, {
    variables: {
      limit: perPage,
      offset: (page - 1) * perPage,
      isFavorite: showFavorite === true ? true : null,
      search: search.trim().length > 0 ? search : null,
      type: pokemonType,
      weakness: pokemonWeakness,
      resistance: pokemonResistance,
    },
    fetchPolicy: "no-cache",
  })

  const totalPages = useMemo(
    () => Math.ceil((data?.pokemons.count || 0) / perPage),
    [data?.pokemons.count]
  )

  const favoriteIconSize = 20

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      disableFavoriteFilter()
      setSearch(e.currentTarget.value)
      setPage(1)
    },
    [disableFavoriteFilter]
  )

  return (
    <PokedexFiltersContext.Provider
      value={{
        enableFavoriteFilter,
      }}
    >
      <AppShell
        header={{
          height: {
            base: 110,
            xs: 60,
          },
        }}
        aside={{
          width: 320,
          breakpoint: "sm",
          collapsed: { mobile: !filtersOpened, desktop: !filtersOpened },
        }}
      >
        <AppShell.Header>
          <Group
            h={isMobileView ? undefined : "100%"}
            px="md"
            justify={!isMobileView ? "space-between" : "center"}
            wrap={isMobileView ? "wrap" : "nowrap"}
            gap={0}
          >
            <Box py="xs">
              <PokedexTitle />
            </Box>

            <Group gap="sm" w={isMobileView ? "100%" : undefined}>
              <Switch
                size="lg"
                color="red"
                checked={showFavorite}
                onChange={handleToggleFavorite}
                onLabel={<IconHeartFilled size={favoriteIconSize} />}
                offLabel={<IconHeart size={favoriteIconSize} />}
              />

              <TextInput
                flex={isMobileView ? 1 : undefined}
                placeholder="Search"
                value={search}
                onChange={handleSearch}
                leftSection={
                  <IconSearch
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                radius="lg"
              />
              <Indicator disabled={!isFilterActive} offset={3} color="red">
                <ActionIcon
                  onClick={openFilters}
                  size={rem(36)}
                  radius="lg"
                  variant="light"
                  disabled={filtersOpened}
                  color="gray"
                >
                  <IconFilter />
                </ActionIcon>
              </Indicator>

              <ColorSchemeButton />
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          {data?.pokemons.edges.length === 0 ? (
            <Center my="xl">
              <Text>
                No pokemons found{" "}
                {showFavorite && (
                  <>
                    {" "}
                    in your <b>favorites list</b>
                  </>
                )}
              </Text>
            </Center>
          ) : (
            <Container
              size={view === "list" ? "sm" : "xl"}
              py={{ base: "md", xs: "sm", sm: "md", lg: "xl" }}
              px={{ base: "lg", xs: "sm", lg: "xl" }}
            >
              {view === "list" ? (
                <PokemonsList
                  pokemons={data?.pokemons.edges}
                  perPage={perPage}
                  asideOpen={filtersOpened}
                />
              ) : (
                <PokemonsGallery
                  pokemons={data?.pokemons.edges}
                  perPage={perPage}
                  asideOpen={filtersOpened}
                />
              )}
              <Center my="xl">
                <Pagination
                  radius="lg"
                  value={page}
                  onChange={handleSetPage}
                  total={totalPages}
                />
              </Center>
            </Container>
          )}
        </AppShell.Main>

        <AppShell.Aside p="md">
          <AppShell.Section grow component={ScrollArea}>
            <PokedexFilters
              closeFilters={closeFilters}
              view={view}
              setView={setView}
              pokemonType={pokemonType}
              setPokemonType={setPokemonType}
              pokemonWeakness={pokemonWeakness}
              setPokemonWeakness={setPokemonWeakness}
              pokemonResistance={pokemonResistance}
              setPokemonResistance={setPokemonResistance}
            />
          </AppShell.Section>

          <AppShell.Section>
            <Group justify="space-between" align="center">
              <Text>
                Frontend by{" "}
                <Anchor href="https://petrbrabec.cz">Petr Brabec</Anchor>
              </Text>
              <Anchor
                href="https://gitlab.com/petrbrabec/frontend-code-challenge-pokedex"
                size={rem(24)}
              >
                <IconBrandGitlab />
              </Anchor>
            </Group>
          </AppShell.Section>
        </AppShell.Aside>
      </AppShell>
    </PokedexFiltersContext.Provider>
  )
}
