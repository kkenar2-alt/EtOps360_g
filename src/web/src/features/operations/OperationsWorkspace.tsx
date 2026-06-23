import { useEffect, useMemo, useState } from 'react'
import type { EtOpsFilters, OperationDetail, OperationRow, SmartColumn } from '../../types/etops'
import { SmartTable, type SmartTableColumn } from '../../components/SmartTable'
import { StatusPill } from '../../components/StatusPill'
import { etOpsApi } from '../../lib/api'

type OperationsWorkspaceProps = {
  rows: OperationRow[]
  columns: SmartColumn[]
  filters: EtOpsFilters
  title?: string
  processScope?: string[]
  onGroupChange: (value: string) => void
}

const operationColumns = (columns: SmartColumn[]): SmartTableColumn<OperationRow>[] =>
  columns.map((column) => ({
    key: column.key as keyof OperationRow & string,
    label: column.label,
    minWidth: column.minWidth,
    preferredWidth: column.preferredWidth,
    groupable: column.isGroupable,
    filterable: column.isFilterable,
  }))

const matchesProcessScope = (row: OperationRow, scope?: string[]) => {
  if (!scope || scope.length === 0) return true
  const value = row.process.toLocaleLowerCase('tr-TR')
  return scope.some((item) => value.includes(item.toLocaleLowerCase('tr-TR')))
}

export function OperationsWorkspace({
  rows,
  columns,
  filters,
  title = 'Sube siparis, fire, lot ve sevkiyat hareketleri',
  processScope,
  onGroupChange,
}: OperationsWorkspaceProps) {
  const [selectedRow, setSelectedRow] = useState<OperationRow | null>(rows[0] ?? null)
  const [detail, setDetail] = useState<OperationDetail | null>(null)

  const visibleRows = useMemo(() => rows.filter((row) => matchesProcessScope(row, processScope)), [processScope, rows])

  useEffect(() => {
    if (!selectedRow && visibleRows.length > 0) {
      setSelectedRow(visibleRows[0])
    }
  }, [selectedRow, visibleRows])

  useEffect(() => {
    if (!selectedRow) return
    etOpsApi.operation(selectedRow.id).then(setDetail).catch(() => setDetail(null))
  }, [selectedRow])

  return (
    <section className="workspace-split">
      <SmartTable
        title={title}
        rows={visibleRows}
        columns={operationColumns(columns)}
        groupBy={filters.groupBy}
        onGroupByChange={onGroupChange}
        onOpenRow={setSelectedRow}
      />

      <aside className="detail-drawer detail-drawer--inline">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Satir detayi</p>
            <h2>{detail?.title ?? selectedRow?.documentNo ?? 'Kayit secin'}</h2>
          </div>
          {selectedRow ? <StatusPill value={selectedRow.status} /> : null}
        </div>

        {detail ? (
          <>
            <div className="detail-fields detail-fields--compact">
              {detail.fields.map((field) => (
                <label key={field.label} className="detail-field">
                  <span>{field.label}</span>
                  {field.options && field.options.length > 0 ? (
                    <select defaultValue={field.options.find((option) => option.label === field.value)?.id ?? ''}>
                      <option value="">{field.value}</option>
                      {field.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input value={field.value} readOnly />
                  )}
                </label>
              ))}
            </div>

            <div className="line-list line-list--compact">
              {detail.lines.map((line) => (
                <div key={`${line.product}-${line.lot}`} className="line-row">
                  <strong>{line.product}</strong>
                  <span>{line.lot}</span>
                  <span>{line.quantity} {line.unit}</span>
                  <span>{line.amount.toLocaleString('tr-TR')} TL</span>
                </div>
              ))}
            </div>

            <div className="decision-list">
              {detail.decisions.map((decision) => (
                <span key={decision}>{decision}</span>
              ))}
            </div>

            <div className="audit-box">
              {detail.auditTrail.map((event) => (
                <span key={event}>{event}</span>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">Satir detayina ulasilamadi.</div>
        )}
      </aside>
    </section>
  )
}
