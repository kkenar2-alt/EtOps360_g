import { AlertTriangle, ArrowRight, CheckCircle2, CircleDot, ShieldAlert } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { DashboardSummary } from '../../types/etops'
import { StatusPill } from '../../components/StatusPill'

type DashboardOverviewProps = {
  summary: DashboardSummary
}

const statusIcon = (status: string) => {
  if (status === 'done') return <CheckCircle2 size={16} />
  if (status === 'review') return <ShieldAlert size={16} />
  return <CircleDot size={16} />
}

export function DashboardOverview({ summary }: DashboardOverviewProps) {
  return (
    <section className="dashboard-grid">
      <div className="kpi-grid">
        {summary.kpis.map((kpi) => (
          <article key={kpi.id} className={`kpi-card kpi-card--${kpi.tone}`}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <div>
              <StatusPill value={kpi.delta} tone={kpi.tone === 'danger' ? 'danger' : 'good'} />
              <small>{kpi.hint}</small>
            </div>
          </article>
        ))}
      </div>

      <section className="journey-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Karkastan kasaya</p>
            <h2>Urun, evrak ve para akisi</h2>
          </div>
          <span className="soft-badge">Lot izlenebilir</span>
        </div>
        <div className="journey-rail">
          {summary.journey.map((stage, index) => (
            <article key={stage.id} className={`journey-stage journey-stage--${stage.status}`}>
              <div className="journey-icon">{statusIcon(stage.status)}</div>
              <strong>{stage.label}</strong>
              <span>{stage.value}</span>
              <p>{stage.detail}</p>
              {index < summary.journey.length - 1 ? <ArrowRight className="journey-arrow" size={16} /> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="chart-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Saatlik trend</p>
            <h2>Satis, fire ve randiman</h2>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={summary.trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#6c8f7a" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6c8f7a" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="wasteGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#c58b61" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#c58b61" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ddd2" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="sales" name="Satis" stroke="#547b68" fill="url(#salesGradient)" />
            <Area type="monotone" dataKey="waste" name="Fire" stroke="#b56f43" fill="url(#wasteGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      <section className="alerts-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Aksiyon bekleyenler</p>
            <h2>Risk ve istisnalar</h2>
          </div>
        </div>
        <div className="alert-list">
          {summary.alerts.map((alert) => (
            <article key={alert.id} className={`alert-card alert-card--${alert.severity}`}>
              <AlertTriangle size={18} />
              <div>
                <strong>{alert.title}</strong>
                <p>{alert.detail}</p>
                <span>{alert.owner}</span>
              </div>
              <button type="button">{alert.actionLabel}</button>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
