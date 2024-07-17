import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Tabs,
  rem,
  useComputedColorScheme,
} from "@mantine/core"
import { IconList, IconPhoto, IconX } from "@tabler/icons-react"
import { useCallback } from "react"
import { type PokedexView, usePokedexParams } from "../hooks/usePokedexParams"
import { PokemonTypeSelect } from "./PokemonTypeSelect"

const iconStyle = { width: rem(18), height: rem(18) }

export const PokedexFilters: React.FC<{
  closeFilters: () => void
}> = ({ closeFilters }) => {
  const colorScheme = useComputedColorScheme()
  const [
    { type, weakness, resistance, view },
    { setType, setWeakness, setResistance, setView, clear },
  ] = usePokedexParams()

  const handleClear = useCallback(() => {
    clear()
    closeFilters()
  }, [clear, closeFilters])

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
          value={type || null}
          onChange={setType}
        />

        <PokemonTypeSelect
          label="Pokemon Weakness"
          placeholder="Pick a pokemons weakness"
          value={weakness || null}
          onChange={setWeakness}
        />

        <PokemonTypeSelect
          label="Pokemon Resistance"
          placeholder="Pick a type pokemon is resistant to"
          value={resistance || null}
          onChange={setResistance}
        />

        <Button variant="light" color="gray" onClick={handleClear} mt="lg">
          Clear Filters
        </Button>

        <Button color="indigo" onClick={closeFilters}>
          See Results
        </Button>
      </Stack>
    </>
  )
}
