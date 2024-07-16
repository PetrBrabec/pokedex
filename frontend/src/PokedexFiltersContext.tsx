import { createContext } from "react"

export const PokedexFiltersContext = createContext<{
  enableFavoriteFilter: () => void
}>({
  enableFavoriteFilter: () => {
    throw new Error("PokedexFiltersContext not initialized")
  },
})
