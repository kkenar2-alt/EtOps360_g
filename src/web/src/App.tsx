import { RefreshCcw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Shell } from './components/Shell'
import { DashboardOverview } from './features/dashboard/DashboardOverview'
import { ControlTowerWorkspace } from './features/controltower/ControlTowerWorkspace'
import { DocumentsWorkspace } from './features/documents/DocumentsWorkspace'
import { LoginScreen } from './features/auth/LoginScreen'
import { OperationsWorkspace } from './features/operations/OperationsWorkspace'
import { ReconciliationPanel } from './features/reconciliation/ReconciliationPanel'
import { etOpsApi } from './lib/api'
import { clearSession, readStoredSession, storeSession } from './lib/session'
import type {
  Bootstrap,
  DashboardSummary,
  DocumentRow,
  EtOpsFilters,
  LoginResponse,
  OperationRow,
  ReconciliationRow,
} from './types/etops'

type AppData = {
  bootstrap: Bootstrap
  dashboard: DashboardSummary
  operations: OperationRow[]
  reconciliation: ReconciliationRow[]
  documents: DocumentRow[]
}

const createInitialFilters = (session?: LoginResponse | null): EtOpsFilters => ({
  branchId: session?.session.activeBranchId ?? 'all',
  protein: 'all',
  period: 'today',
  search: '',
  groupBy: 'branch',
})

function App() {
  const [session, setSession] = useState<LoginResponse | null>(() => readStoredSession())
  const [filters, setFilters] = useState<EtOpsFilters>(() => createInitialFilters(readStoredSession()))
  const [data, setData] = useState<AppData | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(session))
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!session) return

    setIsLoading(true)
    setError(null)

    try {
      const bootstrap = session.bootstrap
      const [dashboard, operations, reconciliation, documents] = await Promise.all([
        etOpsApi.dashboard(filters),
        etOpsApi.operations(filters),
        etOpsApi.reconciliation(filters),
        etOpsApi.documents(filters),
      ])

      setData({ bootstrap, dashboard, operations, reconciliation, documents })
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
    setData(null)
  }

  const handleLogout = () => {
    clearSession()
    setSession(null)
    setData(null)
    setFilters(createInitialFilters(null))
  }

  if (!session) {
    return <LoginScreen onLogin={handleLogin} />
  }

  if (!data && isLoading) {
    return (
      <main className="boot-screen">
        <div className="brand-mark">E360</div>
        <h1>EtOps 360 yukleniyor</h1>
        <p>Sube yetkileri, operasyon verileri ve mutabakat akisi hazirlaniyor.</p>
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

  return (
    <Shell bootstrap={data.bootstrap} filters={filters} onFilterChange={setFilters} onLogout={handleLogout}>
      {error ? (
        <div className="inline-warning">
          Veri yenileme hatasi: {error}
          <button type="button" onClick={load}>
            Yenile
          </button>
        </div>
      ) : null}

      <DashboardOverview summary={data.dashboard} />
      <ControlTowerWorkspace filters={filters} />
      <OperationsWorkspace
        rows={data.operations}
        columns={data.bootstrap.operationColumns}
        filters={filters}
        onGroupChange={(groupBy) => setFilters((current) => ({ ...current, groupBy }))}
      />
      <div className="lower-grid">
        <ReconciliationPanel rows={data.reconciliation} />
        <DocumentsWorkspace
          documents={data.documents}
          documentTypes={data.bootstrap.documentTypes}
          branches={data.bootstrap.branches}
          filters={filters}
        />
      </div>
    </Shell>
  )
}

export default App
