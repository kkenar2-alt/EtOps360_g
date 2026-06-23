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
  reasonCodes: SelectOption[]
  partners: SelectOption[]
  units: SelectOption[]
  products: SelectOption[]
  filters: EtOpsFilters
}

export function DocumentsWorkspace({
  documents,
  documentTypes,
  branches,
  reasonCodes,
  partners,
  units,
  products,
  filters,
}: DocumentsWorkspaceProps) {
  const [selectedDocumentId, setSelectedDocumentId] = useState(documents[0]?.id ?? '')
  const [detail, setDetail] = useState<DocumentDetail | null>(null)
  const [generated, setGenerated] = useState<GeneratedDocument | null>(null)
  const [draft, setDraft] = useState({
    documentType: documentTypes[0]?.id ?? 'branch-order',
    sourceId: 'manual',
    branchId: filters.branchId === 'all' ? 'bursa-12' : filters.branchId,
    reasonCode: 'manual-entry',
    partnerId: partners[0]?.id ?? 'logo',
    productId: products[0]?.id ?? 'kofte-180',
    quantity: 1,
    unit: units[0]?.id ?? 'kg',
    note: 'Entegrasyonsuz firma icin kontrollu manuel taslak',
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
            <h2>Oluşan ve manuel girilen evraklar</h2>
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
                <small>{document.branch} · {document.partner}</small>
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
            <h2>{detail?.title ?? 'Evrak seçin'}</h2>
          </div>
          {detail ? <StatusPill value={detail.status} /> : null}
        </div>

        {detail ? (
          <>
            <div className="detail-fields">
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
          <div className="empty-state">Evrak detayına ulaşılamadı.</div>
        )}
      </div>

      <div className="manual-document-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Entegrasyonsuz firma akışı</p>
            <h2>Başından sonuna evrak oluştur</h2>
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
          label="Şube / nokta"
          value={draft.branchId}
          options={visibleBranches}
          onChange={(value) => setDraft((current) => ({ ...current, branchId: value }))}
        />
        <ComboField
          id="document-product"
          label="Ürün / malzeme"
          value={draft.productId}
          options={products}
          onChange={(value) => setDraft((current) => ({ ...current, productId: value }))}
        />
        <ComboField
          id="document-reason"
          label="Neden"
          value={draft.reasonCode}
          options={reasonCodes}
          onChange={(value) => setDraft((current) => ({ ...current, reasonCode: value }))}
        />
        <ComboField
          id="document-partner"
          label="Partner / cari"
          value={draft.partnerId}
          options={partners}
          onChange={(value) => setDraft((current) => ({ ...current, partnerId: value }))}
        />
        <ComboField
          id="document-unit"
          label="Birim"
          value={draft.unit}
          options={units}
          onChange={(value) => setDraft((current) => ({ ...current, unit: value }))}
        />
        <label className="detail-field" htmlFor="document-quantity">
          <span>Miktar</span>
          <input
            id="document-quantity"
            type="number"
            min="0"
            value={draft.quantity}
            onChange={(event) => setDraft((current) => ({ ...current, quantity: Number(event.target.value) }))}
          />
        </label>
        <label className="detail-field detail-field--wide" htmlFor="document-note">
          <span>Açıklama</span>
          <textarea
            id="document-note"
            value={draft.note}
            onChange={(event) => setDraft((current) => ({ ...current, note: event.target.value }))}
          />
        </label>

        <button type="button" className="primary-action" onClick={createDocument}>
          <WandSparkles size={18} />
          Evrak taslağı oluştur ve detaya bağla
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
