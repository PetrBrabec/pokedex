import { Image } from "@mantine/core"
import type { PokemonBase } from "../types/PokemonBase"

export const PokemonImage: React.FC<Pick<PokemonBase, "id" | "name">> = ({
  id,
  name,
}) => {
  return (
    <Image
      src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${id}.png`}
      width="100%"
      alt={name}
      loading="eager"
    />
  )
}
