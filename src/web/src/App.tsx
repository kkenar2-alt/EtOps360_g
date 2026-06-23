import { RefreshCcw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Shell } from './components/Shell'
import { CatalogWorkspace } from './features/catalogs/CatalogWorkspace'
import { DashboardOverview } from './features/dashboard/DashboardOverview'
import { DocumentsWorkspace } from './features/documents/DocumentsWorkspace'
import { IntegrationQueuePanel } from './features/integrations/IntegrationQueuePanel'
import { LoginScreen } from './features/auth/LoginScreen'
import { OperationsWorkspace } from './features/operations/OperationsWorkspace'
import { QualityWorkspace } from './features/quality/QualityWorkspace'
import { ReconciliationPanel } from './features/reconciliation/ReconciliationPanel'
import { ReportingWorkspace } from './features/reports/ReportingWorkspace'
import { SecurityWorkspace } from './features/security/SecurityWorkspace'
import { TraceabilityTimeline } from './features/traceability/TraceabilityTimeline'
import { WorkQueuePanel } from './features/workqueue/WorkQueuePanel'
import { etOpsApi } from './lib/api'
import { clearSession, readStoredSession, storeSession } from './lib/session'
import type {
  Bootstrap,
  CatalogSection,
  DashboardSummary,
  DocumentRow,
  EtOpsFilters,
  IntegrationQueueItem,
  LoginResponse,
  ModuleId,
  OperationRow,
  QualityCheck,
  ReconciliationRow,
  ReportDefinition,
  SecurityModel,
  TraceabilityResponse,
  WorkQueueItem,
} from './types/etops'

type AppData = {
  bootstrap: Bootstrap
  dashboard: DashboardSummary
  operations: OperationRow[]
  reconciliation: ReconciliationRow[]
  documents: DocumentRow[]
  traceability: TraceabilityResponse
  workQueue: WorkQueueItem[]
  quality: QualityCheck[]
  catalogs: CatalogSection[]
  reports: ReportDefinition[]
  integrationQueue: IntegrationQueueItem[]
  securityModel: SecurityModel
}

const createInitialFilters = (session?: LoginResponse | null): EtOpsFilters => ({
  branchId: session?.session.activeBranchId ?? 'all',
  protein: 'all',
  period: 'today',
  search: '',
  groupBy: 'branch',
})

function App() {
  const storedSession = useMemo(() => readStoredSession(), [])
  const [session, setSession] = useState<LoginResponse | null>(() => storedSession)
  const [filters, setFilters] = useState<EtOpsFilters>(() => createInitialFilters(storedSession))
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard')
  const [data, setData] = useState<AppData | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(session))
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!session) return

    setIsLoading(true)
    setError(null)

    try {
      const bootstrap = session.bootstrap
      const [
        dashboard,
        operations,
        reconciliation,
        documents,
        traceability,
        workQueue,
        quality,
        catalogs,
        reports,
        integrationQueue,
        securityModel,
      ] = await Promise.all([
        etOpsApi.dashboard(filters),
        etOpsApi.operations(filters),
        etOpsApi.reconciliation(filters),
        etOpsApi.documents(filters),
        etOpsApi.traceability(filters),
        etOpsApi.workQueue(filters),
        etOpsApi.quality(filters),
        etOpsApi.catalogs(),
        etOpsApi.reports(),
        etOpsApi.integrationQueue(),
        etOpsApi.securityModel(),
      ])

      setData({
        bootstrap,
        dashboard,
        operations,
        reconciliation,
        documents,
        traceability,
        workQueue,
        quality,
        catalogs,
        reports,
        integrationQueue,
        securityModel,
      })
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Bilinmeyen baglanti hatasi')
    } finally {
      setIsLoading(false)
    }
  }, [filters, session])

  useEffect(() => {
    void load()
  }, [load])

  const handleLogin = (nextSession: LoginResponse) => {
    storeSession(nextSession)
    setSession(nextSession)
    setFilters(createInitialFilters(nextSession))
    setActiveModule('dashboard')
    setData(null)
  }

  const handleLogout = () => {
    clearSession()
    setSession(null)
    setData(null)
    setFilters(createInitialFilters(null))
    setActiveModule('dashboard')
  }

  if (!session) {
    return <LoginScreen onLogin={handleLogin} />
  }

  if (!data && isLoading) {
    return (
      <main className="boot-screen">
        <div className="brand-mark">E360</div>
        <h1>EtOps 360 yukleniyor</h1>
        <p>Sube yetkileri, operasyon verileri, evrak merkezi ve mutabakat akisi hazirlaniyor.</p>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="boot-screen boot-screen--error">
        <div className="brand-mark">E360</div>
        <h1>API baglantisi bekleniyor</h1>
        <p>{error ?? 'Backend API henuz ayakta degil.'}</p>
        <code>dotnet run --project .\src\EtOps360.Api\EtOps360.Api.csproj --launch-profile http</code>
        <button type="button" className="primary-action" onClick={load}>
          <RefreshCcw size={18} />
          Tekrar dene
        </button>
      </main>
    )
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'operations':
        return (
          <OperationsWorkspace
            rows={data.operations}
            columns={data.bootstrap.operationColumns}
            filters={filters}
            title="Sube siparis onerisi, onay ve fire hareketleri"
            processScope={['sube siparisi', 'fire', 'iade', 'menu recetesi']}
            onGroupChange={(groupBy) => setFilters((current) => ({ ...current, groupBy }))}
          />
        )
      case 'production':
        return (
          <>
            <TraceabilityTimeline traceability={data.traceability} />
            <OperationsWorkspace
              rows={data.operations}
              columns={data.bootstrap.operationColumns}
              filters={filters}
              title="Karkas kabul, parcalama ve uretim partileri"
              processScope={['karkas', 'parcalama', 'uretim']}
              onGroupChange={(groupBy) => setFilters((current) => ({ ...current, groupBy }))}
            />
          </>
        )
      case 'wms':
        return (
          <OperationsWorkspace
            rows={data.operations}
            columns={data.bootstrap.operationColumns}
            filters={filters}
            title="WMS, FEFO, lot, soguk oda ve sube kabul akisi"
            processScope={['sevkiyat', 'sube kabul', 'mal kabul']}
            onGroupChange={(groupBy) => setFilters((current) => ({ ...current, groupBy }))}
          />
        )
      case 'shipment':
        return (
          <OperationsWorkspace
            rows={data.operations}
            columns={data.bootstrap.operationColumns}
            filters={filters}
            title="Sevkiyat, arac sicakligi ve kabul farklari"
            processScope={['sevkiyat', 'sube kabul']}
            onGroupChange={(groupBy) => setFilters((current) => ({ ...current, groupBy }))}
          />
        )
      case 'reconciliation':
        return <ReconciliationPanel rows={data.reconciliation} />
      case 'quality':
        return <QualityWorkspace rows={data.quality} />
      case 'documents':
        return (
          <DocumentsWorkspace
            documents={data.documents}
            documentTypes={data.bootstrap.documentTypes}
            branches={data.bootstrap.branches}
            reasonCodes={data.bootstrap.reasonCodes}
            partners={data.bootstrap.partners}
            units={data.bootstrap.units}
            products={data.bootstrap.productMasters}
            filters={filters}
          />
        )
      case 'catalogs':
        return <CatalogWorkspace catalogs={data.catalogs} />
      case 'reports':
        return <ReportingWorkspace definitions={data.reports} filters={filters} />
      case 'integrations':
        return <IntegrationQueuePanel rows={data.integrationQueue} />
      case 'security':
        return <SecurityWorkspace model={data.securityModel} session={data.bootstrap.session} />
      default:
        return (
          <>
            <DashboardOverview summary={data.dashboard} />
            <TraceabilityTimeline traceability={data.traceability} />
            <div className="lower-grid">
              <WorkQueuePanel items={data.workQueue} />
              <ReconciliationPanel rows={data.reconciliation} />
            </div>
          </>
        )
    }
  }

  return (
    <Shell
      bootstrap={data.bootstrap}
      filters={filters}
      activeModule={activeModule}
      onModuleChange={setActiveModule}
      onFilterChange={setFilters}
      onLogout={handleLogout}
    >
      {error ? (
        <div className="inline-warning">
          Veri yenileme hatasi: {error}
          <button type="button" onClick={load}>
            Yenile
          </button>
        </div>
      ) : null}

      {renderModule()}
    </Shell>
  )
}

export default App
