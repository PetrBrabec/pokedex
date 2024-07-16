import { ActionIcon, Tooltip, rem, useMantineColorScheme } from "@mantine/core"
import { useColorScheme } from "@mantine/hooks"
import { IconBrightness, IconMoon, IconSun } from "@tabler/icons-react"
import { useCallback, useMemo } from "react"

export const ColorSchemeButton: React.FC = () => {
  const systemColorScheme = useColorScheme()
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  const toggleScheme = useCallback(() => {
    const nextScheme = systemColorScheme === "light" ? "dark" : "light"
    const revertedNextScheme = systemColorScheme === "light" ? "light" : "dark"
    setColorScheme(
      colorScheme === "auto"
        ? nextScheme
        : colorScheme === nextScheme
        ? revertedNextScheme
        : "auto"
    )
  }, [colorScheme, setColorScheme, systemColorScheme])

  const icon = useMemo(
    () =>
      ({
        auto: <IconBrightness />,
        light: <IconSun />,
        dark: <IconMoon />,
      }[colorScheme]),
    [colorScheme]
  )

  return (
    <Tooltip
      label={`color mode: ${colorScheme}`}
      position="top-end"
      withArrow
      arrowPosition="center"
    >
      <ActionIcon
        variant="light"
        size={rem(36)}
        radius="lg"
        color="gray"
        onClick={toggleScheme}
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  )
}

export default ColorSchemeButton
