import { Boxes, ClipboardList, DatabaseZap, Route, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { StatusPill } from '../../components/StatusPill'
import { etOpsApi } from '../../lib/api'
import type { EtOpsFilters } from '../../types/etops'
import type { ControlTowerData } from '../../types/controltower'

type ControlTowerWorkspaceProps = {
  filters: EtOpsFilters
}

const emptyData: ControlTowerData | null = null

export function ControlTowerWorkspace({ filters }: ControlTowerWorkspaceProps) {
  const [data, setData] = useState<ControlTowerData | null>(emptyData)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setError(null)

    Promise.all([
      etOpsApi.controlCatalogs(),
      etOpsApi.controlTraceability(filters),
      etOpsApi.controlWorkQueue(filters),
      etOpsApi.controlQuality(filters),
      etOpsApi.controlReports(),
      etOpsApi.controlIntegrationQueue(),
    ])
      .then(([catalogs, traceability, workQueue, quality, reports, integrationQueue]) => {
        if (cancelled) return
        setData({ catalogs, traceability, workQueue, quality, reports, integrationQueue })
      })
      .catch((caught) => {
        if (cancelled) return
        setError(caught instanceof Error ? caught.message : 'Kontrol kulesi verisi alinamadi')
      })

    return () => {
      cancelled = true
    }
  }, [filters])

  if (error) {
    return <div className="inline-warning">Kontrol kulesi yuklenemedi: {error}</div>
  }

  if (!data) {
    return <div className="empty-state">Kontrol kulesi verileri yukleniyor...</div>
  }

  return (
    <section className="control-tower">
      <div className="control-header">
        <div>
          <p className="eyebrow">EtOps 360 kontrol kulesi</p>
          <h2>{data.traceability.mainLot} · {data.traceability.family}</h2>
          <span>{data.traceability.summary}</span>
        </div>
        <Route size={24} />
      </div>

      <div className="trace-grid">
        {data.traceability.nodes.map((node) => (
          <article key={node.id} className="trace-card">
            <span>{node.stage}</span>
            <strong>{node.label}</strong>
            <p>{node.lot}</p>
            <small>{node.quantity} · {node.owner} · {node.timestamp}</small>
            <StatusPill value={node.status} />
          </article>
        ))}
      </div>

      <div className="tower-grid">
        <article className="tower-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Aksiyon</p>
              <h2>Yetkiye gore is kuyrugu</h2>
            </div>
            <ClipboardList size={20} />
          </div>
          <div className="mini-list">
            {data.workQueue.map((item) => (
              <div key={item.id} className="mini-row">
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.branch} · {item.ownerRole} · {item.dueText}</span>
                  <small>{item.action}</small>
                </div>
                <StatusPill value={item.status} />
              </div>
            ))}
          </div>
        </article>

        <article className="tower-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Kalite</p>
              <h2>HACCP / CCP / OPRP kontrol</h2>
            </div>
            <ShieldCheck size={20} />
          </div>
          <div className="mini-list">
            {data.quality.map((item) => (
              <div key={item.id} className="mini-row">
                <div>
                  <strong>{item.checkPoint}</strong>
                  <span>{item.lot} · {item.branchOrPlant}</span>
                  <small>Sonuc: {item.result} / Limit: {item.limit}</small>
                </div>
                <StatusPill value={item.status} />
              </div>
            ))}
          </div>
        </article>

        <article className="tower-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Kart mantigi</p>
              <h2>Combo kaynaklari</h2>
            </div>
            <Boxes size={20} />
          </div>
          <div className="chip-list">
            {data.catalogs.map((catalog) => (
              <span key={catalog.id} className="catalog-chip">
                <b>{catalog.title}</b>
                <small>{catalog.options.length} kart</small>
              </span>
            ))}
          </div>
        </article>

        <article className="tower-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Entegrasyon</p>
              <h2>Logo/banka aktarim kuyrugu</h2>
            </div>
            <DatabaseZap size={20} />
          </div>
          <div className="mini-list">
            {data.integrationQueue.map((item) => (
              <div key={item.id} className="mini-row">
                <div>
                  <strong>{item.targetSystem}</strong>
                  <span>{item.documentNo}</span>
                  <small>{item.idempotencyKey}</small>
                </div>
                <StatusPill value={item.state} />
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
