import type { QualityCheck } from '../../types/etops'
import { SmartTable, type SmartTableColumn } from '../../components/SmartTable'

const columns: SmartTableColumn<QualityCheck>[] = [
  { key: 'lot', label: 'Lot', preferredWidth: 160, groupable: true },
  { key: 'checkPoint', label: 'Kontrol noktasi', preferredWidth: 210, groupable: true },
  { key: 'protein', label: 'Aile', preferredWidth: 140, groupable: true },
  { key: 'branchOrPlant', label: 'Nokta', preferredWidth: 150, groupable: true },
  { key: 'result', label: 'Sonuc', preferredWidth: 110 },
  { key: 'limit', label: 'Limit', preferredWidth: 110 },
  { key: 'status', label: 'Durum', preferredWidth: 120, groupable: true },
  { key: 'action', label: 'Aksiyon', preferredWidth: 160, groupable: true },
]

type QualityWorkspaceProps = {
  rows: QualityCheck[]
}

export function QualityWorkspace({ rows }: QualityWorkspaceProps) {
  return <SmartTable title="HACCP / CCP / OPRP ve kalite blokajlari" rows={rows} columns={columns} groupBy="status" />
}
