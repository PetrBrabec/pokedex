import { Badge, Card, Group, Text } from "@mantine/core"
import Link from "next/link"
import type { PokemonBase } from "../types/PokemonBase"
import { type PokemonType, PokemonTypeColors } from "../types/PokemonType"
import styles from "./PokemonCard.module.css"
import { PokemonFavoriteButton } from "./PokemonFavoriteButton"
import { PokemonImage } from "./PokemonImage"

export const PokemonCard: React.FC<PokemonBase> = ({
  id,
  name,
  isFavorite,
  types,
}) => {
  return (
    <Link href={`/${name.toLowerCase()}`} style={{ textDecoration: "unset" }}>
      <Card
        shadow="xs"
        padding="lg"
        radius="lg"
        withBorder
        className={styles.card}
      >
        <Card.Section>
          <PokemonImage id={id} name={name} />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs" gap="xs" wrap="nowrap">
          <Text fz="h3" fw={500}>
            {name}
          </Text>
          <PokemonFavoriteButton id={id} isFavorite={isFavorite} />
        </Group>

        <Group gap="xs">
          {types.map((type) => (
            <Badge key={type} color={PokemonTypeColors[type as PokemonType]}>
              {type}
            </Badge>
          ))}
        </Group>
      </Card>
    </Link>
  )
}
