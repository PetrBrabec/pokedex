import { type PokedexParams, getRawParams, getRawParamsWithoutUndefined } from "./hooks/usePokedexParams";

export const Path = {
  Pokedex: (params?: Partial<PokedexParams>) => params == null ? '/' : `/?${new URLSearchParams(getRawParamsWithoutUndefined(getRawParams(params))).toString()}`,
  Pokemon: (name: string) => `/${name.toLowerCase()}`,
}