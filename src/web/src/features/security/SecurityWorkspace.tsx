import { KeyRound, LockKeyhole, ShieldCheck, UsersRound } from 'lucide-react'
import { SmartTable, type SmartTableColumn } from '../../components/SmartTable'
import { StatusPill } from '../../components/StatusPill'
import type { BranchAccess, ModuleProgress, RolePermission, SecurityModel, UserSession } from '../../types/etops'

type SecurityWorkspaceProps = {
  model: SecurityModel
  session: UserSession
}

const roleColumns: SmartTableColumn<RolePermission>[] = [
  { key: 'role', label: 'Rol', preferredWidth: 160, groupable: true },
  { key: 'scope', label: 'Kapsam', preferredWidth: 150, groupable: true },
  { key: 'description', label: 'Açıklama', preferredWidth: 340 },
  {
    key: 'permissions',
    label: 'Yetkiler',
    preferredWidth: 420,
    render: (row) => row.permissions.join(', '),
  },
  {
    key: 'dataScopes',
    label: 'Veri sınırı',
    preferredWidth: 230,
    render: (row) => row.dataScopes.join(', '),
  },
]

const branchColumns: SmartTableColumn<BranchAccess>[] = [
  { key: 'branchName', label: 'Şube / nokta', preferredWidth: 170, groupable: true },
  { key: 'region', label: 'Bölge', preferredWidth: 140, groupable: true },
  { key: 'users', label: 'Kullanıcı grubu', preferredWidth: 230 },
  { key: 'dataIsolation', label: 'Veri izolasyonu', preferredWidth: 260, groupable: true },
  { key: 'approvalLimit', label: 'Onay kuralı', preferredWidth: 300 },
  { key: 'modules', label: 'Modüller', preferredWidth: 340, render: (row) => row.modules.join(', ') },
]

const progressColumns: SmartTableColumn<ModuleProgress>[] = [
  { key: 'module', label: 'Modül', preferredWidth: 240, groupable: true },
  { key: 'status', label: 'Durum', preferredWidth: 130, groupable: true },
  { key: 'done', label: 'Tamam %', preferredWidth: 100 },
  { key: 'remaining', label: 'Kalan iş', preferredWidth: 320 },
  { key: 'nextCodeArea', label: 'Sonraki kod alanı', preferredWidth: 240, groupable: true },
]

export function SecurityWorkspace({ model, session }: SecurityWorkspaceProps) {
  const allowedBranches = session.allowedBranchIds.join(', ')
  const permissionCount = session.permissions?.length ?? 0

  return (
    <section className="security-workspace">
      <div className="sprint-banner sprint-banner--security">
        <div>
          <p className="eyebrow">Sprint 02 aktif</p>
          <h2>Kullanıcı, şube, yetki, veri izolasyonu ve audit omurgası</h2>
          <span>
            Aktif oturum: {session.userName} · {session.role} · {permissionCount} yetki · {allowedBranches}
          </span>
        </div>
        <ShieldCheck size={34} />
      </div>

      <div className="security-summary-grid">
        <article className="security-summary-card">
          <UsersRound size={20} />
          <span>Rol matrisi</span>
          <strong>{model.roles.length} rol</strong>
          <small>RBAC + şube veri kapsamı</small>
        </article>
        <article className="security-summary-card">
          <LockKeyhole size={20} />
          <span>Şube izolasyonu</span>
          <strong>{model.branchScopes.length} kapsam</strong>
          <small>Object-level authorization için hazır</small>
        </article>
        <article className="security-summary-card">
          <KeyRound size={20} />
          <span>Guard rail</span>
          <strong>{model.guardRails.length} kural</strong>
          <small>Logo, audit, PCI ve idempotency</small>
        </article>
      </div>

      <div className="guardrail-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Zorunlu güvenlik ve entegrasyon kuralları</p>
            <h2>Üretim öncesi kırmızı çizgiler</h2>
          </div>
          <StatusPill value="Zorunlu" tone="danger" />
        </div>
        <div className="guardrail-list">
          {model.guardRails.map((rule) => (
            <span key={rule}>{rule}</span>
          ))}
        </div>
      </div>

      <SmartTable title="Rol ve yetki matrisi" rows={model.roles} columns={roleColumns} groupBy="scope" dense />
      <SmartTable title="Şube, bölge ve veri kapsamı" rows={model.branchScopes} columns={branchColumns} groupBy="region" dense />
      <SmartTable title="Modül tamamlanma ve sonraki kod alanları" rows={model.moduleProgress} columns={progressColumns} groupBy="status" dense />
    </section>
  )
}
