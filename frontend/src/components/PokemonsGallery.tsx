import { SimpleGrid, Skeleton } from "@mantine/core"
import { useMemo } from "react"
import type { PokemonBase } from "../types/PokemonBase"
import { PokemonCard } from "./PokemonCard"

export const PokemonsGallery: React.FC<{
  pokemons?: Array<PokemonBase>
  perPage: number
  asideOpen: boolean
}> = ({ pokemons, perPage, asideOpen }) => {
  const cols = useMemo(() => {
    const baseCols = [1, 2, 3, 4]
    return asideOpen ? [1, ...baseCols] : baseCols
  }, [asideOpen])

  return (
    <SimpleGrid
      cols={{
        base: cols[0],
        xs: cols[1],
        sm: cols[2],
        md: cols[3],
      }}
      spacing={{ base: "md", sm: "md" }}
      verticalSpacing={{ base: "md", sm: "md" }}
    >
      {!pokemons
        ? new Array(perPage).fill(null).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Skeleton key={index} height={360} />
          ))
        : pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))}
    </SimpleGrid>
  )
}
