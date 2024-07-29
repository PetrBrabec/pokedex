import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import type { PokemonType } from "../types/PokemonType"

export type PokedexView = "gallery" | "list"

export interface PokedexParamsRaw extends Record<string, string | undefined> {
  showFavorites?: string
  search?: string
  page?: string
  type?: string
  weakness?: string
  resistance?: string
  view?: string
}

export interface PokedexParams {
  showFavorites: boolean
  search: string
  page: number
  view: PokedexView
  type?: PokemonType
  weakness?: PokemonType
  resistance?: PokemonType
}

export const getRawParamsWithoutUndefined = (
  params: PokedexParamsRaw
): Record<string, string> =>
  Object.keys(params).reduce(
    (s, key) =>
      params[key] == null
        ? s
        : {
            // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
            ...s,
            [key]: params[key],
          },
    {}
  )

export const getRawParams = (
  params: Partial<PokedexParams>
): PokedexParamsRaw => ({
  showFavorites: params.showFavorites ? "" : undefined,
  search: params.search || undefined,
  page: params.page && params.page > 1 ? String(params.page) : undefined,
  view: params.view === "gallery" ? undefined : params.view,
  type: params.type || undefined,
  weakness: params.weakness || undefined,
  resistance: params.resistance || undefined,
})

export const usePokedexParams = (): [
  PokedexParams,
  {
    setParams: (params: PokedexParams) => void
    setShowFavorites: (showFavorites: boolean) => void
    setType: (type: PokemonType | null) => void
    setWeakness: (weakness: PokemonType | null) => void
    setResistance: (resistance: PokemonType | null) => void
    setSearch: (search: string) => void
    setPage: (page: number) => void
    setView: (view: PokedexView) => void
    clear: () => void

    isFilterActive: boolean
    isSearchActive: boolean
  },
  boolean
] => {
  const router = useRouter()

  const rawQuery = router.query as PokedexParamsRaw

  const params = useMemo<PokedexParams>(
    () => ({
      search: rawQuery.search || "",
      page: rawQuery.page ? Number(rawQuery.page) : 1,
      view: (rawQuery.view as PokedexView) || "gallery",
      showFavorites: typeof rawQuery.showFavorites === "string",
      resistance: rawQuery.resistance as PokemonType,
      type: rawQuery.type as PokemonType,
      weakness: rawQuery.weakness as PokemonType,
    }),
    [
      rawQuery.search,
      rawQuery.page,
      rawQuery.view,
      rawQuery.showFavorites,
      rawQuery.resistance,
      rawQuery.type,
      rawQuery.weakness,
    ]
  )

  const setRawParams = useCallback(
    (params: PokedexParamsRaw) => {
      router.push(
        {
          query: getRawParamsWithoutUndefined(params),
        },
        undefined,
        { shallow: true }
      )
    },
    [router]
  )

  const setParams = useCallback(
    (newParams: PokedexParams) => {
      setRawParams(getRawParams(newParams))
    },
    [setRawParams]
  )

  const setShowFavorites = useCallback(
    (showFavorites: boolean) =>
      setParams({ ...params, page: 1, showFavorites }),
    [setParams, params]
  )

  const setType = useCallback(
    (type: PokemonType | null) =>
      setParams({ ...params, page: 1, type: type || undefined }),
    [setParams, params]
  )

  const setWeakness = useCallback(
    (weakness: PokemonType | null) =>
      setParams({ ...params, page: 1, weakness: weakness || undefined }),
    [setParams, params]
  )

  const setResistance = useCallback(
    (resistance: PokemonType | null) =>
      setParams({ ...params, page: 1, resistance: resistance || undefined }),
    [setParams, params]
  )

  const setSearch = useCallback(
    (search: string) => setParams({ ...params, page: 1, search }),
    [setParams, params]
  )

  const setPage = useCallback(
    (page: number) => setParams({ ...params, page }),
    [setParams, params]
  )

  const setView = useCallback(
    (view: PokedexView) => setParams({ ...params, view }),
    [setParams, params]
  )

  const isFilterActive = useMemo(
    () =>
      params.type != null ||
      params.weakness != null ||
      params.resistance != null,
    [params.type, params.weakness, params.resistance]
  )

  const isSearchActive = useMemo(
    () => params.search.trim().length > 0,
    [params.search]
  )

  const clear = useCallback(() => {
    setParams({
      ...params,
      showFavorites: false,
      search: "",
      page: 1,
      type: undefined,
      weakness: undefined,
      resistance: undefined,
    })
  }, [setParams, params])

  return [
    params,
    {
      setParams,
      setShowFavorites,
      setType,
      setWeakness,
      setResistance,
      setSearch,
      setPage,
      setView,
      clear,
      isFilterActive,
      isSearchActive,
    },
    router.isReady,
  ]
}
