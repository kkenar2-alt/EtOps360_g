import clsx from 'clsx'

type StatusPillProps = {
  value: string
  tone?: 'good' | 'warning' | 'danger' | 'neutral'
}

const inferTone = (value: string): StatusPillProps['tone'] => {
  const lower = value.toLowerCase()

  if (lower.includes('tam') || lower.includes('aktar') || lower.includes('hazir')) return 'good'
  if (lower.includes('fark') || lower.includes('bekli') || lower.includes('incele')) return 'warning'
  if (lower.includes('risk') || lower.includes('hata') || lower.includes('gecikti')) return 'danger'
  return 'neutral'
}

export function StatusPill({ value, tone = inferTone(value) }: StatusPillProps) {
  return <span className={clsx('status-pill', `status-pill--${tone}`)}>{value}</span>
}
