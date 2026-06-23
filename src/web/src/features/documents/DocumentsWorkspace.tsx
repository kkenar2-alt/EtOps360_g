import { FilePlus2, FolderOpen, WandSparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ComboField } from '../../components/ComboField'
import { StatusPill } from '../../components/StatusPill'
import { etOpsApi } from '../../lib/api'
import type {
  DocumentDetail,
  DocumentRow,
  EtOpsFilters,
  GeneratedDocument,
  SelectOption,
} from '../../types/etops'

type DocumentsWorkspaceProps = {
  documents: DocumentRow[]
  documentTypes: SelectOption[]
  branches: SelectOption[]
  filters: EtOpsFilters
}

const reasonOptions: SelectOption[] = [
  { id: 'manual-entry', label: 'Entegrasyon yok - manuel evrak' },
  { id: 'waste-approval', label: 'Fire onayi' },
  { id: 'settlement-close', label: 'Mutabakat kapama' },
  { id: 'quality-hold', label: 'Kalite blokaji' },
]

export function DocumentsWorkspace({ documents, documentTypes, branches, filters }: DocumentsWorkspaceProps) {
  const [selectedDocumentId, setSelectedDocumentId] = useState(documents[0]?.id ?? '')
  const [detail, setDetail] = useState<DocumentDetail | null>(null)
  const [generated, setGenerated] = useState<GeneratedDocument | null>(null)
  const [draft, setDraft] = useState({
    documentType: documentTypes[0]?.id ?? 'branch-order',
    sourceId: 'manual',
    branchId: filters.branchId === 'all' ? 'bursa-12' : filters.branchId,
    reasonCode: 'manual-entry',
  })

  const visibleBranches = useMemo(() => branches.filter((branch) => branch.id !== 'all'), [branches])

  useEffect(() => {
    if (!selectedDocumentId) return

    etOpsApi
      .document(selectedDocumentId)
      .then(setDetail)
      .catch(() => setDetail(null))
  }, [selectedDocumentId])

  const createDocument = async () => {
    const result = await etOpsApi.generateDocument(draft)
    setGenerated(result)
  }

  return (
    <section className="documents-grid">
      <div className="document-list-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Evrak merkezi</p>
            <h2>Olusan ve manuel girilen evraklar</h2>
          </div>
          <FolderOpen size={20} />
        </div>
        <div className="document-list">
          {documents.map((document) => (
            <button
              type="button"
              key={document.id}
              className={selectedDocumentId === document.id ? 'document-row document-row--active' : 'document-row'}
              onClick={() => setSelectedDocumentId(document.id)}
            >
              <div>
                <strong>{document.documentNo}</strong>
                <span>{document.type}</span>
              </div>
              <StatusPill value={document.status} />
            </button>
          ))}
        </div>
      </div>

      <div className="document-detail-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Tıklama ile detay</p>
            <h2>{detail?.title ?? 'Evrak secin'}</h2>
          </div>
          {detail ? <StatusPill value={detail.status} /> : null}
        </div>

        {detail ? (
          <>
            <div className="detail-fields">
              {detail.fields.map((field) => (
                <label key={field.label} className="detail-field">
                  <span>{field.label}</span>
                  <input value={field.value} readOnly={field.kind === 'readonly' || field.kind === 'status'} />
                </label>
              ))}
            </div>

            <div className="line-list">
              {detail.lines.map((line) => (
                <div key={`${line.product}-${line.lot}`} className="line-row">
                  <strong>{line.product}</strong>
                  <span>{line.lot}</span>
                  <span>
                    {line.quantity} {line.unit}
                  </span>
                  <span>{line.amount.toLocaleString('tr-TR')} TL</span>
                </div>
              ))}
            </div>

            <div className="audit-box">
              {detail.auditTrail.map((event) => (
                <span key={event}>{event}</span>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">Evrak detayına ulasilamadi.</div>
        )}
      </div>

      <div className="manual-document-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Entegrasyonsuz firma akisi</p>
            <h2>Tıklama ile evrak oluştur</h2>
          </div>
          <FilePlus2 size={20} />
        </div>

        <ComboField
          id="document-type"
          label="Evrak tipi"
          value={draft.documentType}
          options={documentTypes}
          onChange={(value) => setDraft((current) => ({ ...current, documentType: value }))}
        />
        <ComboField
          id="document-branch"
          label="Sube / nokta"
          value={draft.branchId}
          options={visibleBranches}
          onChange={(value) => setDraft((current) => ({ ...current, branchId: value }))}
        />
        <ComboField
          id="document-reason"
          label="Neden"
          value={draft.reasonCode}
          options={reasonOptions}
          onChange={(value) => setDraft((current) => ({ ...current, reasonCode: value }))}
        />

        <button type="button" className="primary-action" onClick={createDocument}>
          <WandSparkles size={18} />
          Evrak taslagi olustur
        </button>

        {generated ? (
          <div className="generated-box">
            <strong>{generated.documentNo}</strong>
            <span>{generated.message}</span>
          </div>
        ) : null}
      </div>
    </section>
  )
}
