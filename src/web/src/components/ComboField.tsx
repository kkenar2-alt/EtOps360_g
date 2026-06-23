import type { SelectOption } from '../types/etops'

type ComboFieldProps = {
  id: string
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

export function ComboField({ id, label, value, options, onChange }: ComboFieldProps) {
  return (
    <label className="combo-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.group ? `${option.group} - ${option.label}` : option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
