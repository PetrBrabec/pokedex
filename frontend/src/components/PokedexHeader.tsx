import { ActionIcon, Box, Group, Indicator, Switch, rem } from "@mantine/core"
import { IconFilter, IconHeart, IconHeartFilled } from "@tabler/icons-react"
import dynamic from "next/dynamic"
import { useCallback, useMemo } from "react"
import { useMobileView } from "../hooks/useMobileView"
import { usePokedexParams } from "../hooks/usePokedexParams"
import { PokedexTitle } from "./PokedexTitle"
import { PokemonSearchInput } from "./PokemonSearchInput"

const ColorSchemeButton = dynamic(() => import("./ColorSchemeButton"), {
  ssr: false,
})

const favoriteIconSize = 24

export const PokedexHeader: React.FC<{
  onFiltersOpen: () => void
  filtersOpened: boolean
}> = ({ onFiltersOpen, filtersOpened }) => {
  const [{ showFavorites }, { setShowFavorites, setPage, isFilterActive }] =
    usePokedexParams()

  const handleToggleFavorites = useCallback(() => {
    setPage(1)
    setShowFavorites(!showFavorites)
  }, [showFavorites, setShowFavorites, setPage])

  const isMobileView = useMobileView()

  return (
    <Group
      h={isMobileView ? undefined : "100%"}
      px="md"
      justify={!isMobileView ? "space-between" : "center"}
      wrap={isMobileView ? "wrap" : "nowrap"}
      gap={0}
    >
      <Box py="xs" flex={1}>
        <PokedexTitle />
      </Box>

      <Group gap="sm" w={isMobileView ? "100%" : undefined}>
        <Switch
          size="xl"
          color="red"
          styles={{
            track: { cursor: "pointer" },
          }}
          checked={showFavorites}
          onChange={handleToggleFavorites}
          onLabel={<IconHeartFilled size={favoriteIconSize} />}
          offLabel={<IconHeart size={favoriteIconSize} />}
        />

        <PokemonSearchInput />

        <Indicator disabled={!isFilterActive} offset={3} color="red">
          <ActionIcon
            onClick={onFiltersOpen}
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
  )
}

export default PokedexHeader
