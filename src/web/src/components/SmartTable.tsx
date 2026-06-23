import { ChevronDown, ChevronsUpDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { StatusPill } from './StatusPill'

export type SmartTableColumn<T extends object> = {
  key: Extract<keyof T, string>
  label: string
  minWidth?: number
  preferredWidth?: number
  groupable?: boolean
  render?: (row: T) => ReactNode
}

type SmartTableProps<T extends object> = {
  title: string
  rows: T[]
  columns: SmartTableColumn<T>[]
  groupBy?: string
  onGroupByChange?: (value: string) => void
  onOpenRow?: (row: T) => void
}

export function SmartTable<T extends object>({
  title,
  rows,
  columns,
  groupBy = '',
  onGroupByChange,
  onOpenRow,
}: SmartTableProps<T>) {
  const [sortKey, setSortKey] = useState<string>(columns[0]?.key ?? '')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [widths, setWidths] = useState<Record<string, number>>(() =>
    Object.fromEntries(columns.map((column) => [column.key, column.preferredWidth ?? 150])),
  )

  const sortedRows = useMemo(() => {
    const nextRows = [...rows]
    nextRows.sort((a, b) => {
      const first = String(a[sortKey as keyof T] ?? '')
      const second = String(b[sortKey as keyof T] ?? '')
      return sortDirection === 'asc' ? first.localeCompare(second) : second.localeCompare(first)
    })
    return nextRows
  }, [rows, sortDirection, sortKey])

  const groupedRows = useMemo(() => {
    if (!groupBy) return new Map<string, T[]>([['Tum kayitlar', sortedRows]])

    return sortedRows.reduce((acc, row) => {
      const value = String(row[groupBy as keyof T] ?? 'Diger')
      const bucket = acc.get(value) ?? []
      bucket.push(row)
      acc.set(value, bucket)
      return acc
    }, new Map<string, T[]>())
  }, [groupBy, sortedRows])

  const startResize = (key: string, startClientX: number) => {
    const startWidth = widths[key] ?? 150

    const onMove = (event: MouseEvent) => {
      const nextWidth = Math.max(80, startWidth + event.clientX - startClientX)
      setWidths((current) => ({ ...current, [key]: nextWidth }))
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const templateColumns = columns.map((column) => `${widths[column.key] ?? 150}px`).join(' ')

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortKey(key)
    setSortDirection('asc')
  }

  return (
    <section className="table-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Filtrelenebilir operasyon tablosu</p>
          <h2>{title}</h2>
        </div>
        {onGroupByChange ? (
          <label className="mini-combo">
            Grupla
            <select value={groupBy} onChange={(event) => onGroupByChange(event.target.value)}>
              <option value="">Yok</option>
              {columns
                .filter((column) => column.groupable)
                .map((column) => (
                  <option key={column.key} value={column.key}>
                    {column.label}
                  </option>
                ))}
            </select>
          </label>
        ) : null}
      </div>

      <div className="smart-table" role="table">
        <div className="smart-row smart-row--head" role="row" style={{ gridTemplateColumns: templateColumns }}>
          {columns.map((column) => (
            <button
              key={column.key}
              type="button"
              className="smart-cell smart-cell--head"
              onClick={() => toggleSort(column.key)}
            >
              <span>{column.label}</span>
              {sortKey === column.key ? <ChevronDown size={14} /> : <ChevronsUpDown size={14} />}
              <span
                className="resize-handle"
                onMouseDown={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  startResize(column.key, event.clientX)
                }}
              />
            </button>
          ))}
        </div>

        {[...groupedRows.entries()].map(([group, groupRows]) => (
          <div key={group} className="table-group">
            <div className="group-label">
              <span>{group}</span>
              <strong>{groupRows.length} kayit</strong>
            </div>
            {groupRows.map((row, index) => (
              <button
                type="button"
                key={`${group}-${index}`}
                className="smart-row smart-row--body"
                style={{ gridTemplateColumns: templateColumns }}
                onClick={() => onOpenRow?.(row)}
              >
                {columns.map((column) => {
                  const rawValue = row[column.key]
                  const value = column.render ? column.render(row) : String(rawValue ?? '')
                  const isStatus = column.key.toLowerCase().includes('status') || column.key.toLowerCase().includes('state')

                  return (
                    <span key={column.key} className="smart-cell">
                      {isStatus && typeof value === 'string' ? <StatusPill value={value} /> : value}
                    </span>
                  )
                })}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
