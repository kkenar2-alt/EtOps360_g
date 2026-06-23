import { Settings2 } from 'lucide-react'
import type { CatalogSection } from '../../types/etops'

type CatalogWorkspaceProps = {
  catalogs: CatalogSection[]
}

export function CatalogWorkspace({ catalogs }: CatalogWorkspaceProps) {
  return (
    <section className="catalog-grid">
      {catalogs.map((catalog) => (
        <article key={catalog.id} className="catalog-card">
          <div className="panel-heading catalog-card__head">
            <div>
              <p className="eyebrow">Kart tanimi</p>
              <h2>{catalog.title}</h2>
              <small>{catalog.description}</small>
            </div>
            <Settings2 size={18} />
          </div>
          <div className="chip-list">
            {catalog.options.map((option) => (
              <span key={option.id} className="catalog-chip">
                <b>{option.label}</b>
                {option.group ? <small>{option.group}</small> : null}
              </span>
            ))}
          </div>
          <div className="catalog-card__foot">
            {catalog.isRequiredForOperations ? 'Operasyon icin zorunlu kart' : 'Destek karti'}
          </div>
        </article>
      ))}
    </section>
  )
}
