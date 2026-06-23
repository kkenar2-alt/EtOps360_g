import type { IntegrationQueueItem } from '../../types/etops'
import { SmartTable, type SmartTableColumn } from '../../components/SmartTable'

const columns: SmartTableColumn<IntegrationQueueItem>[] = [
  { key: 'targetSystem', label: 'Hedef sistem', preferredWidth: 160, groupable: true },
  { key: 'documentNo', label: 'Evrak', preferredWidth: 150 },
  { key: 'idempotencyKey', label: 'Idempotency', preferredWidth: 260 },
  { key: 'state', label: 'Durum', preferredWidth: 140, groupable: true },
  { key: 'lastAttempt', label: 'Son deneme', preferredWidth: 120 },
  { key: 'errorMessage', label: 'Hata', preferredWidth: 240 },
]

type IntegrationQueuePanelProps = {
  rows: IntegrationQueueItem[]
}

export function IntegrationQueuePanel({ rows }: IntegrationQueuePanelProps) {
  return <SmartTable title="Logo, banka robotu ve dis sistem aktarim kuyrugu" rows={rows} columns={columns} groupBy="state" />
}
