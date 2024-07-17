import { ActionIcon, Box, Loader, TextInput, rem } from "@mantine/core"
import { useDebouncedCallback } from "@mantine/hooks"
import { IconSearch, IconX } from "@tabler/icons-react"
import { useCallback, useEffect, useState } from "react"
import { useMobileView } from "../hooks/useMobileView"
import { usePokedexParams } from "../hooks/usePokedexParams"

export const PokemonSearchInput: React.FC = () => {
  const [isDebounced, setIsDebounced] = useState(false)
  const isMobileView = useMobileView()

  const [{ search }, { setSearch, setPage }] = usePokedexParams()

  const [searchText, setSearchText] = useState(search)

  useEffect(() => {
    setSearchText(search)
  }, [search])

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setPage(1)
    setSearch(query)
    setIsDebounced(false)
  }, 500)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.currentTarget.value)
      setIsDebounced(true)
      handleSearch(event.currentTarget.value)
    },
    [handleSearch]
  )

  const handleClear = useCallback(() => {
    setSearchText("")
    setPage(1)
    setSearch("")
  }, [setSearch, setPage])

  return (
    <TextInput
      flex={isMobileView ? 1 : undefined}
      placeholder="Search"
      value={searchText}
      onChange={handleChange}
      leftSection={
        <IconSearch style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      }
      rightSection={
        isDebounced ? (
          <Loader size={16} />
        ) : searchText.trim().length > 0 ? (
          <ActionIcon size={16} variant="transparent" onClick={handleClear}>
            <IconX />
          </ActionIcon>
        ) : (
          <Box size={16} />
        )
      }
      radius="lg"
    />
  )
}
