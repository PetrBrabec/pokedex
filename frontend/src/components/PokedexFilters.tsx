import {
  ActionIcon,
  Group,
  Stack,
  Tabs,
  rem,
  useComputedColorScheme,
} from "@mantine/core"
import { IconList, IconPhoto, IconX } from "@tabler/icons-react"
import { type PokemonType } from "../types/PokemonType"
import type { PokedexView } from "./Pokedex"
import { PokemonTypeSelect } from "./PokemonTypeSelect"

const iconStyle = { width: rem(18), height: rem(18) }

export const PokedexFilters: React.FC<{
  closeFilters: () => void
  view: PokedexView
  setView: (view: PokedexView) => void
  pokemonType: PokemonType | null
  setPokemonType: (type: PokemonType | null) => void
  pokemonWeakness: PokemonType | null
  setPokemonWeakness: (type: PokemonType | null) => void
  pokemonResistance: PokemonType | null
  setPokemonResistance: (type: PokemonType | null) => void
}> = ({
  closeFilters,
  view,
  setView,
  pokemonType,
  setPokemonType,
  pokemonWeakness,
  setPokemonWeakness,
  pokemonResistance,
  setPokemonResistance,
}) => {
  const colorScheme = useComputedColorScheme()
  return (
    <>
      <Group align="center" mb="lg">
        <Tabs
          flex={1}
          value={view}
          onChange={(newView) => setView(newView as PokedexView)}
          variant="pills"
          color={colorScheme === "dark" ? "gray" : "red"}
          radius="xl"
          suppressHydrationWarning
        >
          <Tabs.List grow>
            <Tabs.Tab
              flex={1}
              value="gallery"
              leftSection={<IconPhoto style={iconStyle} />}
            >
              Gallery
            </Tabs.Tab>
            <Tabs.Tab
              flex={1}
              value="list"
              leftSection={<IconList style={iconStyle} />}
            >
              List
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <ActionIcon
          onClick={closeFilters}
          size={rem(38)}
          variant="subtle"
          color="gray"
          radius="xl"
        >
          <IconX />
        </ActionIcon>
      </Group>

      <Stack>
        <PokemonTypeSelect
          label="Pokemon Type"
          placeholder="Pick a pokemon type"
          value={pokemonType}
          onChange={setPokemonType}
        />

        <PokemonTypeSelect
          label="Pokemon Weakness"
          placeholder="Pick a pokemons weakness"
          value={pokemonWeakness}
          onChange={setPokemonWeakness}
        />

        <PokemonTypeSelect
          label="Pokemon Resistance"
          placeholder="Pick a type pokemon is resistant to"
          value={pokemonResistance}
          onChange={setPokemonResistance}
        />
      </Stack>
    </>
  )
}
