import type { ReconciliationRow } from '../../types/etops'
import { SmartTable, type SmartTableColumn } from '../../components/SmartTable'

type ReconciliationPanelProps = {
  rows: ReconciliationRow[]
}

const columns: SmartTableColumn<ReconciliationRow>[] = [
  { key: 'branch', label: 'Sube', preferredWidth: 150, groupable: true },
  { key: 'bank', label: 'Banka', preferredWidth: 160, groupable: true },
  { key: 'channel', label: 'Kanal', preferredWidth: 140, groupable: true },
  { key: 'terminalId', label: 'Terminal', preferredWidth: 130 },
  { key: 'provisionNo', label: 'Provizyon', preferredWidth: 135 },
  { key: 'cashRegisterAmount', label: 'Kasa tutari', preferredWidth: 130 },
  { key: 'bankAmount', label: 'Banka tutari', preferredWidth: 130 },
  { key: 'commission', label: 'Komisyon', preferredWidth: 120 },
  { key: 'valueDate', label: 'Valor', preferredWidth: 115 },
  { key: 'status', label: 'Durum', preferredWidth: 150, groupable: true },
  { key: 'logoState', label: 'Logo', preferredWidth: 140, groupable: true },
]

export function ReconciliationPanel({ rows }: ReconciliationPanelProps) {
  return <SmartTable title="Banka, yemek karti ve online odeme mutabakati" rows={rows} columns={columns} />
}
