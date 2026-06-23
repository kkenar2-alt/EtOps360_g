import {
  Banknote,
  Boxes,
  ClipboardList,
  DatabaseZap,
  FileText,
  Gauge,
  LockKeyhole,
  LogOut,
  Route,
  UserCog,
  Settings2,
  ShieldCheck,
  Store,
  Truck,
  Utensils,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { Bootstrap, EtOpsFilters, ModuleId } from '../types/etops'
import { ComboField } from './ComboField'

type ShellProps = {
  bootstrap: Bootstrap
  filters: EtOpsFilters
  activeModule: ModuleId
  onModuleChange: (module: ModuleId) => void
  onFilterChange: (filters: EtOpsFilters) => void
  onLogout: () => void
  children: ReactNode
}

const navItems: Array<{ id: ModuleId; label: string; icon: typeof Gauge; permission?: string }> = [
  { id: 'dashboard', label: 'Kontrol', icon: Gauge },
  { id: 'operations', label: 'Siparis', icon: Store },
  { id: 'production', label: 'Uretim', icon: Utensils },
  { id: 'wms', label: 'WMS', icon: Boxes },
  { id: 'shipment', label: 'Sevkiyat', icon: Truck },
  { id: 'reconciliation', label: 'Mutabakat', icon: Banknote, permission: 'reconciliation:close' },
  { id: 'quality', label: 'Kalite', icon: ShieldCheck, permission: 'quality:hold' },
  { id: 'documents', label: 'Evrak', icon: FileText, permission: 'documents:generate' },
  { id: 'catalogs', label: 'Kartlar', icon: Settings2, permission: 'catalogs:manage' },
  { id: 'reports', label: 'Rapor', icon: ClipboardList, permission: 'reports:view' },
  { id: 'integrations', label: 'Kuyruk', icon: DatabaseZap, permission: 'integrations:queue' },
  { id: 'security', label: 'Yetki', icon: UserCog, permission: 'security:manage' },
]

const periods = [
  { id: 'today', label: 'Bugun' },
  { id: 'week', label: 'Bu hafta' },
  { id: 'month', label: 'Bu ay' },
  { id: 'quarter', label: 'Ceyrek' },
]

export function Shell({
  bootstrap,
  filters,
  activeModule,
  onModuleChange,
  onFilterChange,
  onLogout,
  children,
}: ShellProps) {
  const permissions = bootstrap.session.permissions ?? []
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
          {navItems
            .filter((item) => !item.permission || permissions.includes(item.permission))
            .map((item) => (
              <button
                type="button"
                key={item.id}
                className={activeModule === item.id ? 'nav-item nav-item--active' : 'nav-item'}
                onClick={() => onModuleChange(item.id)}
              >
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
            <p className="eyebrow">Merkezi operasyon kontrolü · Sprint 02</p>
            <h1>Karkastan kasaya tüm zincir, yetki, evrak ve mutabakat tek ekranda</h1>
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
          <button type="button" className="chain-badge" onClick={() => onModuleChange('dashboard')}>
            <Route size={16} />
            Karkas → Üretim → Şube → POS → Banka → Logo
          </button>
        </section>

        {children}
      </main>
    </div>
  )
}
