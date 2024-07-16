import type { MantineColor } from "@mantine/core"

export const PokemonTypes = [
  "Bug",
  "Dragon",
  "Fairy",
  "Fire",
  "Ghost",
  "Ground",
  "Normal",
  "Psychic",
  "Steel",
  // "Dark", // not in the list
  "Electric",
  "Fighting",
  "Flying",
  "Grass",
  "Ice",
  "Poison",
  "Rock",
  "Water",
] as const

export type PokemonType = (typeof PokemonTypes)[number]

export const PokemonTypeColors: Record<PokemonType, MantineColor> = {
  Bug: "orange",
  Dragon: "red",
  Fairy: "pink",
  Fire: "red",
  Ghost: "gray",
  Ground: "brown",
  Normal: "gray",
  Psychic: "pink.8",
  Steel: "gray",
  Electric: "yellow",
  Fighting: "red",
  Flying: "blue",
  Grass: "green",
  Ice: "cyan",
  Poison: "purple",
  Rock: "brown",
  Water: "blue",
}
