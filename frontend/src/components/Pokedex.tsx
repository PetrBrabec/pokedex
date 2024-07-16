import { useQuery } from "@apollo/client"
import {
  ActionIcon,
  Anchor,
  AppShell,
  Box,
  Center,
  Container,
  Group,
  Image,
  Pagination,
  ScrollArea,
  Switch,
  Text,
  TextInput,
  rem,
  useMantineTheme,
} from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
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
import type { PokemonType } from "../types/PokemonType"
import styles from "./Pokedex.module.css"
import { PokedexFilters } from "./PokedexFilters"

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
  const theme = useMantineTheme()
  const isDoubleHeader = useMediaQuery(
    `(max-width: calc(${theme.breakpoints.xs} - 1px))`
  )
  const [view, setView] = useState<PokedexView>("gallery")
  const [pokemonType, setPokemonType] = useState<PokemonType | null>(null)
  const [pokemonWeakness, setPokemonWeakness] = useState<PokemonType | null>(
    null
  )
  const [pokemonResistance, setPokemonResistance] =
    useState<PokemonType | null>(null)
  const [search, setSearch] = useState("")
  const [filtersOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure()

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
            h={isDoubleHeader ? undefined : "100%"}
            px="md"
            justify={!isDoubleHeader ? "space-between" : "center"}
            wrap={isDoubleHeader ? "wrap" : "nowrap"}
            gap={0}
          >
            <Box py="xs">
              <Anchor href="/" unstyled style={{ textDecoration: "none" }}>
                <Group>
                  <Image src="/favicon.svg" alt="Pokedex" height={40} />
                  <Text className={styles.title} component="h2" fz="h2">
                    Pokedex
                  </Text>
                </Group>
              </Anchor>
            </Box>

            <Group gap="sm" w={isDoubleHeader ? "100%" : undefined}>
              <Switch
                size="lg"
                color="red"
                checked={showFavorite}
                onChange={handleToggleFavorite}
                onLabel={<IconHeartFilled size={favoriteIconSize} />}
                offLabel={<IconHeart size={favoriteIconSize} />}
              />

              <TextInput
                flex={isDoubleHeader ? 1 : undefined}
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
              size="xl"
              py={{ base: "md", xs: "sm", sm: "md", lg: "xl" }}
              px={{ base: "lg", xs: "sm", lg: "xl" }}
            >
              {view === "list" ? (
                <></>
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
