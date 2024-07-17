import { Badge, Box, Card, Flex, Group, Text, rem } from "@mantine/core"
import Link from "next/link"
import { Path } from "../Path"
import { useMobileView } from "../hooks/useMobileView"
import type { PokemonBase } from "../types/PokemonBase"
import { type PokemonType, PokemonTypeColors } from "../types/PokemonType"
import { PokemonFavoriteButton } from "./PokemonFavoriteButton"
import { PokemonImage } from "./PokemonImage"
import styles from "./PokemonListCard.module.css"

const pokemonImageSize = 64

export const PokemonListCard: React.FC<PokemonBase> = ({
  id,
  name,
  isFavorite,
  types,
}) => {
  const isMobileView = useMobileView()

  return (
    <Link href={Path.Pokemon(name)} style={{ textDecoration: "none" }}>
      <Card p={0} withBorder shadow="xs" radius="lg" className={styles.card}>
        <Group pl="md" pr="md" py="xs" justify="center">
          <Box h={rem(pokemonImageSize)} w={rem(pokemonImageSize)}>
            <PokemonImage id={id} name={name} />
          </Box>
          <Flex
            justify="space-between"
            flex={1}
            gap={isMobileView ? rem(6) : "xs"}
            direction={isMobileView ? "column" : "row"}
          >
            <Text fz={rem(24)} lh={rem(28)}>
              {name}
            </Text>
            <Group gap="xs">
              {types.map((type) => (
                <Badge
                  key={type}
                  color={PokemonTypeColors[type as PokemonType]}
                >
                  {type}
                </Badge>
              ))}
            </Group>
          </Flex>
          <PokemonFavoriteButton id={id} isFavorite={isFavorite} />
        </Group>
      </Card>
    </Link>
  )
}
