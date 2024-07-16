import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useMobileView = () => {
  const theme = useMantineTheme()
  return useMediaQuery(
    `(max-width: calc(${theme.breakpoints.xs} - 1px))`
  ) || false
}

