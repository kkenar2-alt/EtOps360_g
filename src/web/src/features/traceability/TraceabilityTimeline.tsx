import { ArrowRight, Route } from 'lucide-react'
import { StatusPill } from '../../components/StatusPill'
import type { TraceabilityResponse } from '../../types/etops'

type TraceabilityTimelineProps = {
  traceability: TraceabilityResponse
}

export function TraceabilityTimeline({ traceability }: TraceabilityTimelineProps) {
  return (
    <section className="timeline-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Karkastan kasaya izlenebilirlik</p>
          <h2>{traceability.mainLot} zinciri</h2>
          <small>{traceability.summary}</small>
        </div>
        <Route size={22} />
      </div>

      <div className="timeline-rail">
        {traceability.nodes.map((node, index) => (
          <article key={node.id} className="timeline-card">
            <div className="timeline-card__head">
              <span>{node.stage}</span>
              <StatusPill value={node.status} />
            </div>
            <strong>{node.label}</strong>
            <p>{node.lot}</p>
            <div className="timeline-card__meta">
              <span>{node.quantity}</span>
              <span>{node.timestamp}</span>
              <span>{node.owner}</span>
            </div>
            <div className="fact-grid">
              {node.facts.slice(0, 2).map((fact) => (
                <span key={`${node.id}-${fact.label}`}>
                  <b>{fact.label}</b>
                  {fact.value}
                </span>
              ))}
            </div>
            {index < traceability.nodes.length - 1 ? <ArrowRight className="timeline-arrow" size={18} /> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
