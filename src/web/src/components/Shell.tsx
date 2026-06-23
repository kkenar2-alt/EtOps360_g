import {
  Banknote,
  Boxes,
  FileText,
  Gauge,
  LockKeyhole,
  LogOut,
  Route,
  ShieldCheck,
  Store,
  Utensils,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { Bootstrap, EtOpsFilters } from '../types/etops'
import { ComboField } from './ComboField'

type ShellProps = {
  bootstrap: Bootstrap
  filters: EtOpsFilters
  onFilterChange: (filters: EtOpsFilters) => void
  onLogout: () => void
  children: ReactNode
}

const navItems = [
  { label: 'Kontrol', icon: Gauge },
  { label: 'Siparis', icon: Store },
  { label: 'Uretim', icon: Utensils },
  { label: 'WMS', icon: Boxes },
  { label: 'Sevkiyat', icon: Route },
  { label: 'Mutabakat', icon: Banknote },
  { label: 'Kalite', icon: ShieldCheck },
  { label: 'Evrak', icon: FileText },
]

const periods = [
  { id: 'today', label: 'Bugun' },
  { id: 'week', label: 'Bu hafta' },
  { id: 'month', label: 'Bu ay' },
  { id: 'quarter', label: 'Ceyrek' },
]

export function Shell({ bootstrap, filters, onFilterChange, onLogout, children }: ShellProps) {
  const setFilter = (key: keyof EtOpsFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">E360</div>
          <div>
            <strong>EtOps 360</strong>
            <span>Karkastan kasaya</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Ana modul navigasyonu">
          {navItems.map((item) => (
            <button type="button" key={item.label} className="nav-item">
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="security-card">
          <LockKeyhole size={18} />
          <div>
            <strong>Yetkili oturum</strong>
            <span>{bootstrap.session.role}</span>
          </div>
        </div>
      </aside>

      <main className="main-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">Merkezi operasyon kontrolu</p>
            <h1>Karkastan kasaya tum zincir tek ekranda</h1>
          </div>
          <div className="user-card">
            <span>{bootstrap.session.userName}</span>
            <strong>{bootstrap.session.role}</strong>
            <button type="button" onClick={onLogout}>
              <LogOut size={14} />
              Cikis
            </button>
          </div>
        </header>

        <section className="filter-strip" aria-label="Genel filtreler">
          <ComboField
            id="branch"
            label="Sube kapsami"
            value={filters.branchId}
            options={bootstrap.branches}
            onChange={(value) => setFilter('branchId', value)}
          />
          <ComboField
            id="protein"
            label="Urun ailesi"
            value={filters.protein}
            options={bootstrap.proteinFamilies}
            onChange={(value) => setFilter('protein', value)}
          />
          <ComboField
            id="period"
            label="Donem"
            value={filters.period}
            options={periods}
            onChange={(value) => setFilter('period', value)}
          />
          <label className="combo-field combo-field--search" htmlFor="search">
            <span>Arama</span>
            <input
              id="search"
              value={filters.search}
              onChange={(event) => setFilter('search', event.target.value)}
              placeholder="Lot, evrak, urun veya sube"
            />
          </label>
        </section>

        {children}
      </main>
    </div>
  )
}
