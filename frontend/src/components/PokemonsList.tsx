import { Skeleton, Stack } from "@mantine/core"
import type { PokemonBase } from "../types/PokemonBase"
import { PokemonListCard } from "./PokemonListCard"

export const PokemonsList: React.FC<{
  pokemons?: Array<PokemonBase>
  perPage: number
  asideOpen: boolean
}> = ({ pokemons, perPage, asideOpen }) => {
  return (
    <Stack gap="xs">
      {!pokemons
        ? new Array(perPage).fill(null).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Skeleton key={index} height={70} />
          ))
        : pokemons.map((pokemon) => (
            <PokemonListCard key={pokemon.id} {...pokemon} />
          ))}
    </Stack>
  )
}
