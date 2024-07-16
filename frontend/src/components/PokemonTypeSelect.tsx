import {
  type ComboboxItem,
  Group,
  type OptionsFilter,
  Select,
  type SelectProps,
} from "@mantine/core"
import { IconCheck, IconCircleFilled } from "@tabler/icons-react"
import {
  type PokemonType,
  PokemonTypeColors,
  PokemonTypes,
} from "../types/PokemonType"

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  )

  filtered.sort((a, b) => a.label.localeCompare(b.label))
  return filtered
}

const iconProps = {
  stroke: 1.5,
  color: "currentColor",
  opacity: 0.6,
  size: 18,
}

const renderSelectOption: SelectProps["renderOption"] = ({
  option,
  checked,
}) => (
  <Group flex="1" gap="xs">
    <IconCircleFilled color={PokemonTypeColors[option.value as PokemonType]} />
    {option.label}
    {checked && (
      <IconCheck style={{ marginInlineStart: "auto" }} {...iconProps} />
    )}
  </Group>
)

export const PokemonTypeSelect: React.FC<{
  value: PokemonType | null
  onChange: (type: PokemonType | null) => void
  label: string
  placeholder: string
}> = ({ value, onChange, label, placeholder }) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={PokemonTypes}
      value={value}
      onChange={(newType) => onChange(newType as PokemonType | null)}
      clearable
      renderOption={renderSelectOption}
      filter={optionsFilter}
      nothingFoundMessage="Nothing found..."
      searchable
      leftSection={
        value && <IconCircleFilled color={PokemonTypeColors[value]} />
      }
    />
  )
}
