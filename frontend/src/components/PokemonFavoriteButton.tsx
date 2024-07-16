import { useMutation } from "@apollo/client"
import { ActionIcon, Anchor, Stack, Text } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { useContext } from "react"
import { PokedexFiltersContext } from "../PokedexFiltersContext"
import { gql } from "../graphql"
import type { PokemonBase } from "../types/PokemonBase"

const PokemonFavoriteMutation = gql(/* GraphQL */ `
  mutation PokemonFavorite($id: ID!) {
    favoritePokemon(id: $id) {
      id
      name
    }
  }
`)

const PokemonUnFavoriteMutation = gql(/* GraphQL */ `
  mutation PokemonUnFavorite($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      name
    }
  }
`)

export const PokemonFavoriteButton: React.FC<
  Pick<PokemonBase, "id" | "isFavorite">
> = ({ id, isFavorite }) => {
  const { enableFavoriteFilter } = useContext(PokedexFiltersContext)

  const [makeFavorite] = useMutation(PokemonFavoriteMutation, {
    refetchQueries: ["Pokemons", "Pokemon"],
    onCompleted(data) {
      notifications.show({
        color: "green",
        title: "Added to favorites",
        message: (
          <Stack gap="xs">
            <Text>
              <b>{data.favoritePokemon!.name}</b> is now your favorite.
            </Text>
            <Anchor onClick={enableFavoriteFilter}>
              See all your favorite pokemons
            </Anchor>
          </Stack>
        ),
      })
    },
    onError(error) {
      notifications.show({
        color: "red",
        title: "Could not add to favorites",
        message:
          "There was a problem adding this pokemon to your favorites, please try again later.",
      })
    },
  })

  const [makeUnFavorite] = useMutation(PokemonUnFavoriteMutation, {
    refetchQueries: ["Pokemons", "Pokemon"],
    onCompleted(data) {
      notifications.show({
        color: "green",
        title: "Removed from favorites",
        message: (
          <Text>
            <b>{data.unFavoritePokemon!.name}</b> is no longer your favorite.
          </Text>
        ),
      })
    },
    onError(error) {
      notifications.show({
        color: "red",
        title: "Could not remove from favorites",
        message:
          "There was a problem removing this pokemon from your favorites, please try again later.",
      })
    },
  })

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isFavorite) {
      makeUnFavorite({ variables: { id } })
    } else {
      makeFavorite({ variables: { id } })
    }
  }

  return (
    <ActionIcon color="red" variant="transparent" onClick={toggleFavorite}>
      {isFavorite ? <IconHeartFilled /> : <IconHeart />}
    </ActionIcon>
  )
}
