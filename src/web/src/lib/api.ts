import type {
  Bootstrap,
  CatalogSection,
  DashboardSummary,
  DocumentDetail,
  DocumentRow,
  EtOpsFilters,
  GenerateDocumentRequest,
  GeneratedDocument,
  IntegrationQueueItem,
  LoginOptions,
  LoginRequest,
  LoginResponse,
  OperationDetail,
  OperationRow,
  QualityCheck,
  ReconciliationRow,
  ReportDefinition,
  ReportResult,
  SecurityModel,
  TraceabilityResponse,
  WorkQueueItem,
} from '../types/etops'

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
  operation: (id: string) => fetchJson<OperationDetail>(`/operations/${id}`),
  traceability: (filters: Partial<EtOpsFilters>) =>
    fetchJson<TraceabilityResponse>(`/traceability${query(filters)}`),
  workQueue: (filters: Partial<EtOpsFilters>) => fetchJson<WorkQueueItem[]>(`/work-queue${query(filters)}`),
  quality: (filters: Partial<EtOpsFilters>) => fetchJson<QualityCheck[]>(`/quality${query(filters)}`),
  reconciliation: (filters: Partial<EtOpsFilters>) =>
    fetchJson<ReconciliationRow[]>(`/reconciliation${query(filters)}`),
  documents: (filters: Partial<EtOpsFilters>) => fetchJson<DocumentRow[]>(`/documents${query(filters)}`),
  document: (id: string) => fetchJson<DocumentDetail>(`/documents/${id}`),
  generateDocument: (request: GenerateDocumentRequest) =>
    fetchJson<GeneratedDocument>('/documents/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    }),
  catalogs: () => fetchJson<CatalogSection[]>('/catalogs'),
  reports: () => fetchJson<ReportDefinition[]>('/reports'),
  reportResult: (reportId: string, filters: Partial<EtOpsFilters>) =>
    fetchJson<ReportResult>(`/reports/${reportId}/result${query(filters)}`),
  integrationQueue: () => fetchJson<IntegrationQueueItem[]>('/integration-queue'),
  securityModel: () => fetchJson<SecurityModel>('/security-model'),
}
