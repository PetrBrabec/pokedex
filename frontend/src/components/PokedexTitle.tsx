import { Group, Image, Text } from "@mantine/core"
import Link from "next/link"

export const PokedexTitle: React.FC = () => (
  <Link href="/" style={{ textDecoration: "none", color: "unset" }}>
    <Group>
      <Image src="/favicon.svg" alt="Pokedex" height={40} />
      <Text fz="h2">Pokedex</Text>
    </Group>
  </Link>
)
