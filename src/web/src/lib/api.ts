import type {
  Bootstrap,
  DashboardSummary,
  DocumentDetail,
  DocumentRow,
  EtOpsFilters,
  GenerateDocumentRequest,
  GeneratedDocument,
  LoginOptions,
  LoginRequest,
  LoginResponse,
  OperationRow,
  ReconciliationRow,
} from '../types/etops'
import type {
  ControlCatalogSection,
  IntegrationQueueItem,
  QualityCheck,
  ReportDefinition,
  TraceChain,
  WorkQueueItem,
} from '../types/controltower'

const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5096/api'

const query = (filters: Partial<EtOpsFilters>) => {
  const params = new URLSearchParams()

  if (filters.branchId) params.set('branchId', filters.branchId)
  if (filters.protein) params.set('protein', filters.protein)
  if (filters.period) params.set('period', filters.period)
  if (filters.search) params.set('search', filters.search)

  const value = params.toString()
  return value ? `?${value}` : ''
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export const etOpsApi = {
  loginOptions: () => fetchJson<LoginOptions>('/auth/options'),
  login: (request: LoginRequest) =>
    fetchJson<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(request),
    }),
  bootstrap: () => fetchJson<Bootstrap>('/bootstrap'),
  dashboard: (filters: Partial<EtOpsFilters>) => fetchJson<DashboardSummary>(`/dashboard${query(filters)}`),
  operations: (filters: Partial<EtOpsFilters>) => fetchJson<OperationRow[]>(`/operations${query(filters)}`),
  reconciliation: (filters: Partial<EtOpsFilters>) =>
    fetchJson<ReconciliationRow[]>(`/reconciliation${query(filters)}`),
  documents: (filters: Partial<EtOpsFilters>) => fetchJson<DocumentRow[]>(`/documents${query(filters)}`),
  document: (id: string) => fetchJson<DocumentDetail>(`/documents/${id}`),
  generateDocument: (request: GenerateDocumentRequest) =>
    fetchJson<GeneratedDocument>('/documents/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    }),
  controlCatalogs: () => fetchJson<ControlCatalogSection[]>('/control/catalogs'),
  controlTraceability: (filters: Partial<EtOpsFilters>) =>
    fetchJson<TraceChain>(`/control/traceability${query(filters)}`),
  controlWorkQueue: (filters: Partial<EtOpsFilters>) =>
    fetchJson<WorkQueueItem[]>(`/control/work-queue${query(filters)}`),
  controlQuality: (filters: Partial<EtOpsFilters>) =>
    fetchJson<QualityCheck[]>(`/control/quality${query(filters)}`),
  controlReports: () => fetchJson<ReportDefinition[]>('/control/reports'),
  controlIntegrationQueue: () => fetchJson<IntegrationQueueItem[]>('/control/integration-queue'),
}
