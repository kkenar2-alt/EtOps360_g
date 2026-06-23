import { ChevronDown, ChevronsUpDown, Download, FilterX } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { StatusPill } from './StatusPill'

export type SmartTableColumn<T extends object> = {
  key: Extract<keyof T, string>
  label: string
  minWidth?: number
  preferredWidth?: number
  groupable?: boolean
  filterable?: boolean
  render?: (row: T) => ReactNode
}

type SmartTableProps<T extends object> = {
  title: string
  rows: T[]
  columns: SmartTableColumn<T>[]
  groupBy?: string
  onGroupByChange?: (value: string) => void
  onOpenRow?: (row: T) => void
  dense?: boolean
}

const stringValue = <T extends object>(row: T, key: string) => String(row[key as keyof T] ?? '')

const isNumericLike = (value: string) => value !== '' && !Number.isNaN(Number(value.replace(',', '.')))

const toCsv = (headers: string[], rows: string[][]) => {
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`
  return [headers.map(escape).join(';'), ...rows.map((row) => row.map(escape).join(';'))].join('\n')
}

export function SmartTable<T extends object>({
  title,
  rows,
  columns,
  groupBy = '',
  onGroupByChange,
  onOpenRow,
  dense = false,
}: SmartTableProps<T>) {
  const [sortKey, setSortKey] = useState<string>(columns[0]?.key ?? '')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})
  const [widths, setWidths] = useState<Record<string, number>>(() =>
    Object.fromEntries(columns.map((column) => [column.key, column.preferredWidth ?? 150])),
  )

  const filteredRows = useMemo(() => {
    const activeFilters = Object.entries(columnFilters).filter(([, value]) => value.trim())
    if (activeFilters.length === 0) return rows

    return rows.filter((row) =>
      activeFilters.every(([key, value]) =>
        stringValue(row, key).toLocaleLowerCase('tr-TR').includes(value.toLocaleLowerCase('tr-TR')),
      ),
    )
  }, [columnFilters, rows])

  const sortedRows = useMemo(() => {
    const nextRows = [...filteredRows]
    nextRows.sort((a, b) => {
      const first = stringValue(a, sortKey)
      const second = stringValue(b, sortKey)
      const result = isNumericLike(first) && isNumericLike(second)
        ? Number(first.replace(',', '.')) - Number(second.replace(',', '.'))
        : first.localeCompare(second, 'tr-TR')
      return sortDirection === 'asc' ? result : -result
    })
    return nextRows
  }, [filteredRows, sortDirection, sortKey])

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

  const exportCsv = () => {
    const headers = columns.map((column) => column.label)
    const body = sortedRows.map((row) => columns.map((column) => stringValue(row, column.key)))
    const blob = new Blob([`\ufeff${toCsv(headers, body)}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${title.replaceAll(' ', '_')}.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const clearFilters = () => setColumnFilters({})

  return (
    <section className={dense ? 'table-panel table-panel--dense' : 'table-panel'}>
      <div className="panel-heading panel-heading--table">
        <div>
          <p className="eyebrow">Filtrelenebilir, gruplanabilir tablo</p>
          <h2>{title}</h2>
          <small>{sortedRows.length.toLocaleString('tr-TR')} / {rows.length.toLocaleString('tr-TR')} kayit</small>
        </div>
        <div className="table-actions">
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
          <button type="button" className="ghost-action" onClick={clearFilters}>
            <FilterX size={16} />
            Filtreleri temizle
          </button>
          <button type="button" className="ghost-action" onClick={exportCsv}>
            <Download size={16} />
            CSV
          </button>
        </div>
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

        <div className="smart-row smart-row--filters" style={{ gridTemplateColumns: templateColumns }}>
          {columns.map((column) => (
            <label key={column.key} className="smart-cell smart-cell--filter">
              <input
                aria-label={`${column.label} filtre`}
                value={columnFilters[column.key] ?? ''}
                onChange={(event) => setColumnFilters((current) => ({ ...current, [column.key]: event.target.value }))}
                placeholder="Filtre"
              />
            </label>
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
                    <span key={column.key} className="smart-cell" title={String(rawValue ?? '')}>
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
