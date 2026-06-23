import { CheckCircle2, Clock3 } from 'lucide-react'
import { StatusPill } from '../../components/StatusPill'
import type { WorkQueueItem } from '../../types/etops'

type WorkQueuePanelProps = {
  items: WorkQueueItem[]
}

export function WorkQueuePanel({ items }: WorkQueuePanelProps) {
  return (
    <section className="queue-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Aksiyon merkezi</p>
          <h2>Yetkiye gore is kuyrugu</h2>
        </div>
        <Clock3 size={20} />
      </div>
      <div className="queue-list">
        {items.map((item) => (
          <article key={item.id} className={`queue-card queue-card--${item.priority.toLocaleLowerCase('tr-TR')}`}>
            <div>
              <span>{item.module}</span>
              <strong>{item.title}</strong>
              <p>{item.suggestedAction}</p>
              <small>{item.branch} · {item.ownerRole} · {item.dueText}</small>
            </div>
            <StatusPill value={item.status} />
          </article>
        ))}
        {items.length === 0 ? (
          <div className="empty-state">
            <CheckCircle2 size={20} />
            Bu filtre icin bekleyen aksiyon yok.
          </div>
        ) : null}
      </div>
    </section>
  )
}
