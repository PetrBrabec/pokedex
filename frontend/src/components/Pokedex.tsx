import { useQuery } from "@apollo/client"
import {
  Anchor,
  AppShell,
  Center,
  Container,
  Group,
  Pagination,
  ScrollArea,
  Text,
  rem,
} from "@mantine/core"
import { useDebouncedValue, useDisclosure } from "@mantine/hooks"
import { IconBrandGitlab } from "@tabler/icons-react"
import dynamic from "next/dynamic"
import { useCallback, useMemo } from "react"
import { gql } from "../graphql"
import { usePokedexParams } from "../hooks/usePokedexParams"
import { PokedexFilters } from "./PokedexFilters"

const PokedexHeader = dynamic(() => import("./PokedexHeader"), {
  ssr: false,
})

const PokemonsGallery = dynamic(() => import("./PokemonsGallery"), {
  ssr: false,
})

const PokemonsList = dynamic(() => import("./PokemonsList"), {
  ssr: false,
})

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

const perPage = 24

export function Pokedex() {
  const [params, { setPage }, isReady] = usePokedexParams()

  const { showFavorites, page, view } = params

  const [filtersOpened, { open: openFilters, close: closeFilters }] =
    useDisclosure()

  const handleSetPage = useCallback(
    (page: number) => {
      setPage(page)
      window.scrollTo(0, 0)
    },
    [setPage]
  )

  const [debouncedParams] = useDebouncedValue(params, 300) // this prevents the query from being called too often

  const { data, previousData, loading } = useQuery(PokemonsQuery, {
    variables: {
      limit: perPage,
      offset: (debouncedParams.page - 1) * perPage,
      isFavorite: debouncedParams.showFavorites ? true : null,
      search:
        debouncedParams.search.trim().length > 0
          ? debouncedParams.search
          : null,
      type: debouncedParams.type,
      weakness: debouncedParams.weakness,
      resistance: debouncedParams.resistance,
    },
    skip: !isReady,
    fetchPolicy: "no-cache", // quick way to prevent favorites page to show outdated data; better would be counting changes done to favorites and invalidating cache based on that
  })

  const totalPages = useMemo(
    () => Math.ceil((data?.pokemons.count || 0) / perPage),
    [data?.pokemons.count]
  )

  const pokemons = isReady
    ? data?.pokemons.edges ||
      (loading ? previousData?.pokemons.edges : undefined)
    : undefined

  return (
    <AppShell
      header={{
        height: {
          base: 110,
          sm: 60,
        },
      }}
      aside={{
        width: 320,
        breakpoint: "sm",
        collapsed: { mobile: !filtersOpened, desktop: !filtersOpened },
      }}
    >
      <AppShell.Header>
        <PokedexHeader
          filtersOpened={filtersOpened}
          onFiltersOpen={openFilters}
        />
      </AppShell.Header>

      <AppShell.Main>
        {pokemons?.length === 0 ? (
          <Center my="xl">
            <Text>
              No pokemons found{" "}
              {showFavorites && (
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
                pokemons={pokemons}
                perPage={perPage}
                asideOpen={filtersOpened}
              />
            ) : (
              <PokemonsGallery
                pokemons={pokemons}
                perPage={perPage}
                asideOpen={filtersOpened}
              />
            )}
            {pokemons && pokemons.length > 0 && (
              <Center my="xl">
                <Pagination
                  radius="lg"
                  value={page}
                  onChange={handleSetPage}
                  total={totalPages}
                />
              </Center>
            )}
          </Container>
        )}
      </AppShell.Main>

      <AppShell.Aside p="md">
        <AppShell.Section grow component={ScrollArea}>
          <PokedexFilters closeFilters={closeFilters} />
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
  )
}
