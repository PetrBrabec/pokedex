import { Group, Image, Text, rem } from "@mantine/core"
import Link from "next/link"
import { Path } from "../Path"

export const PokedexTitle: React.FC = () => {
  return (
    <Link
      href={Path.Pokedex()}
      style={{
        textDecoration: "none",
        color: "unset",
        maxWidth: rem(150),
        display: "block",
      }}
    >
      <Group gap={rem(6)}>
        <Image src="/favicon.svg" alt="Pokedex" height={40} />
        <Text fz="h2">Pokedex</Text>
      </Group>
    </Link>
  )
}
