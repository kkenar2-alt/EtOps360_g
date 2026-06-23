import type { EtOpsFilters, OperationRow, SmartColumn } from '../../types/etops'
import { SmartTable, type SmartTableColumn } from '../../components/SmartTable'

type OperationsWorkspaceProps = {
  rows: OperationRow[]
  columns: SmartColumn[]
  filters: EtOpsFilters
  onGroupChange: (value: string) => void
}

const operationColumns = (columns: SmartColumn[]): SmartTableColumn<OperationRow>[] =>
  columns.map((column) => ({
    key: column.key as keyof OperationRow & string,
    label: column.label,
    minWidth: column.minWidth,
    preferredWidth: column.preferredWidth,
    groupable: column.isGroupable,
  }))

export function OperationsWorkspace({ rows, columns, filters, onGroupChange }: OperationsWorkspaceProps) {
  return (
    <SmartTable
      title="Sube siparis, fire, lot ve sevkiyat hareketleri"
      rows={rows}
      columns={operationColumns(columns)}
      groupBy={filters.groupBy}
      onGroupByChange={onGroupChange}
    />
  )
}
