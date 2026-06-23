import { useEffect, useMemo, useState } from 'react'
import { ComboField } from '../../components/ComboField'
import { SmartTable, type SmartTableColumn } from '../../components/SmartTable'
import { etOpsApi } from '../../lib/api'
import type { EtOpsFilters, ReportDefinition, ReportResult } from '../../types/etops'

type ReportingWorkspaceProps = {
  definitions: ReportDefinition[]
  filters: EtOpsFilters
}

export function ReportingWorkspace({ definitions, filters }: ReportingWorkspaceProps) {
  const [selectedReportId, setSelectedReportId] = useState(definitions[0]?.id ?? 'waste-analysis')
  const [result, setResult] = useState<ReportResult | null>(null)

  const options = useMemo(() => definitions.map((definition) => ({ id: definition.id, label: definition.title })), [definitions])
  const definition = definitions.find((item) => item.id === selectedReportId) ?? definitions[0]

  useEffect(() => {
    if (!selectedReportId) return
    etOpsApi.reportResult(selectedReportId, filters).then(setResult).catch(() => setResult(null))
  }, [filters, selectedReportId])

  const columns: SmartTableColumn<Record<string, string>>[] = useMemo(() => {
    if (!definition) return []
    return definition.columns.map((column) => ({
      key: column.key,
      label: column.label,
      preferredWidth: column.preferredWidth,
      groupable: column.isGroupable,
    })) as SmartTableColumn<Record<string, string>>[]
  }, [definition])

  return (
    <section className="reporting-panel">
      <div className="report-toolbar">
        <ComboField
          id="report-definition"
          label="Rapor"
          value={selectedReportId}
          options={options}
          onChange={setSelectedReportId}
        />
        <div className="report-description">
          <strong>{definition?.title}</strong>
          <span>{definition?.description}</span>
        </div>
      </div>

      {result ? (
        <>
          <div className="kpi-grid kpi-grid--compact">
            {result.metrics.map((metric) => (
              <article key={metric.label} className={`kpi-card kpi-card--${metric.tone}`}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small>{metric.hint}</small>
              </article>
            ))}
          </div>
          <div className="applied-filters">
            {result.appliedFilters.map((filter) => (
              <span key={filter}>{filter}</span>
            ))}
          </div>
          <SmartTable title={result.title} rows={result.rows} columns={columns} dense />
        </>
      ) : (
        <div className="empty-state">Rapor verisi yuklenemedi.</div>
      )}
    </section>
  )
}
