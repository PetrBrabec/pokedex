/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      fragment PokemonBase on Pokemon {\n        id\n        name\n        isFavorite\n        types\n      }\n    ": types.PokemonBaseFragmentDoc,
    "\n  query Pokemons(\n    $limit: Int!\n    $offset: Int\n    $search: String\n    $isFavorite: Boolean\n    $type: String\n    $weakness: String\n    $resistance: String\n  ) {\n    pokemons(\n      query: {\n        limit: $limit\n        offset: $offset\n        filter: {\n          isFavorite: $isFavorite\n          type: $type\n          weakness: $weakness\n          resistance: $resistance\n        }\n        search: $search\n      }\n    ) {\n      edges {\n        ...PokemonBase\n      }\n      count\n    }\n  }\n": types.PokemonsDocument,
    "\n  query Pokemon($name: String!) {\n    pokemonByName(name: $name) {\n      maxHP\n      maxCP\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      evolutions {\n        ...PokemonBase\n      }\n      ...PokemonBase\n    }\n  }\n": types.PokemonDocument,
    "\n  mutation PokemonFavorite($id: ID!) {\n    favoritePokemon(id: $id) {\n      id\n      name\n    }\n  }\n": types.PokemonFavoriteDocument,
    "\n  mutation PokemonUnFavorite($id: ID!) {\n    unFavoritePokemon(id: $id) {\n      id\n      name\n    }\n  }\n": types.PokemonUnFavoriteDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      fragment PokemonBase on Pokemon {\n        id\n        name\n        isFavorite\n        types\n      }\n    "): (typeof documents)["\n      fragment PokemonBase on Pokemon {\n        id\n        name\n        isFavorite\n        types\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Pokemons(\n    $limit: Int!\n    $offset: Int\n    $search: String\n    $isFavorite: Boolean\n    $type: String\n    $weakness: String\n    $resistance: String\n  ) {\n    pokemons(\n      query: {\n        limit: $limit\n        offset: $offset\n        filter: {\n          isFavorite: $isFavorite\n          type: $type\n          weakness: $weakness\n          resistance: $resistance\n        }\n        search: $search\n      }\n    ) {\n      edges {\n        ...PokemonBase\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query Pokemons(\n    $limit: Int!\n    $offset: Int\n    $search: String\n    $isFavorite: Boolean\n    $type: String\n    $weakness: String\n    $resistance: String\n  ) {\n    pokemons(\n      query: {\n        limit: $limit\n        offset: $offset\n        filter: {\n          isFavorite: $isFavorite\n          type: $type\n          weakness: $weakness\n          resistance: $resistance\n        }\n        search: $search\n      }\n    ) {\n      edges {\n        ...PokemonBase\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Pokemon($name: String!) {\n    pokemonByName(name: $name) {\n      maxHP\n      maxCP\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      evolutions {\n        ...PokemonBase\n      }\n      ...PokemonBase\n    }\n  }\n"): (typeof documents)["\n  query Pokemon($name: String!) {\n    pokemonByName(name: $name) {\n      maxHP\n      maxCP\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      evolutions {\n        ...PokemonBase\n      }\n      ...PokemonBase\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation PokemonFavorite($id: ID!) {\n    favoritePokemon(id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation PokemonFavorite($id: ID!) {\n    favoritePokemon(id: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation PokemonUnFavorite($id: ID!) {\n    unFavoritePokemon(id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation PokemonUnFavorite($id: ID!) {\n    unFavoritePokemon(id: $id) {\n      id\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;