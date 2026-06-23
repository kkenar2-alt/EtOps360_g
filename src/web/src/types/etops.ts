export type SelectOption = {
  id: string
  label: string
  group?: string | null
}

export type UserSession = {
  userName: string
  role: string
  activeBranchId: string
  allowedBranchIds: string[]
  permissions?: string[] | null
}

export type LoginProfile = {
  userName: string
  displayName: string
  role: string
  allowedBranchIds: string[]
  defaultBranchId: string
  permissions?: string[] | null
}

export type LoginOptions = {
  profiles: LoginProfile[]
  branches: SelectOption[]
}

export type LoginRequest = {
  userName: string
  branchId: string
}

export type LoginResponse = {
  accessToken: string
  session: UserSession
  bootstrap: Bootstrap
  expiresAt: string
}

export type SmartColumn = {
  key: string
  label: string
  minWidth: number
  preferredWidth: number
  isGroupable: boolean
  isFilterable: boolean
}

export type Bootstrap = {
  session: UserSession
  branches: SelectOption[]
  proteinFamilies: SelectOption[]
  documentTypes: SelectOption[]
  reasonCodes: SelectOption[]
  units: SelectOption[]
  processTypes: SelectOption[]
  partners: SelectOption[]
  productMasters: SelectOption[]
  operationColumns: SmartColumn[]
}

export type KpiCard = {
  id: string
  label: string
  value: string
  delta: string
  tone: 'good' | 'warning' | 'danger' | 'neutral' | string
  hint: string
}

export type JourneyStage = {
  id: string
  label: string
  value: string
  detail: string
  status: string
}

export type TrendPoint = {
  label: string
  sales: number
  waste: number
  yield: number
}

export type Alert = {
  id: string
  severity: string
  title: string
  detail: string
  owner: string
  actionLabel: string
  targetModule?: string | null
  targetId?: string | null
}

export type DashboardSummary = {
  kpis: KpiCard[]
  journey: JourneyStage[]
  trends: TrendPoint[]
  alerts: Alert[]
}

export type OperationRow = {
  id: string
  branch: string
  region: string
  product: string
  protein: string
  lot: string
  process: string
  suggestedQty: number
  approvedQty: number
  actualSales: number
  wasteQty: number
  wasteReason: string
  status: string
  documentNo: string
  updatedAt: string
  temperatureStatus: string
  approvalStep: string
}

export type OperationDetail = {
  id: string
  title: string
  fields: DocumentField[]
  lines: DocumentLine[]
  traceability: TraceabilityNode[]
  decisions: string[]
  auditTrail: string[]
}

export type ReconciliationRow = {
  id: string
  branch: string
  bank: string
  channel: string
  terminalId: string
  provisionNo: string
  cashRegisterAmount: number
  bankAmount: number
  commission: number
  valueDate: string
  status: string
  logoState: string
}

export type DocumentRow = {
  id: string
  type: string
  documentNo: string
  source: string
  branch: string
  partner: string
  amount: string
  status: string
  createdAt: string
  isGeneratedFromClick: boolean
}

export type DocumentField = {
  label: string
  value: string
  kind: string
  options?: SelectOption[] | null
}

export type DocumentLine = {
  product: string
  lot: string
  quantity: number
  unit: string
  amount: number
}

export type DocumentDetail = {
  id: string
  title: string
  status: string
  fields: DocumentField[]
  lines: DocumentLine[]
  auditTrail: string[]
}

export type GenerateDocumentRequest = {
  documentType: string
  sourceId: string
  branchId: string
  reasonCode: string
  partnerId?: string | null
  productId?: string | null
  quantity?: number
  unit?: string | null
  note?: string | null
}

export type GeneratedDocument = {
  id: string
  documentNo: string
  status: string
  detailUrl: string
  message: string
}

export type CatalogSection = {
  id: string
  title: string
  description: string
  options: SelectOption[]
  isRequiredForOperations: boolean
}

export type TraceabilityNode = {
  id: string
  stage: string
  label: string
  lot: string
  quantity: string
  status: string
  timestamp: string
  owner: string
  facts: DocumentField[]
}

export type TraceabilityResponse = {
  mainLot: string
  productFamily: string
  summary: string
  nodes: TraceabilityNode[]
}

export type WorkQueueItem = {
  id: string
  module: string
  priority: string
  title: string
  branch: string
  ownerRole: string
  dueText: string
  suggestedAction: string
  status: string
}

export type QualityCheck = {
  id: string
  lot: string
  checkPoint: string
  protein: string
  branchOrPlant: string
  result: string
  limit: string
  status: string
  action: string
}

export type ReportDefinition = {
  id: string
  title: string
  description: string
  groupOptions: SelectOption[]
  filterOptions: SelectOption[]
  columns: SmartColumn[]
}

export type ReportMetric = {
  label: string
  value: string
  hint: string
  tone: string
}

export type ReportResult = {
  id: string
  title: string
  appliedFilters: string[]
  metrics: ReportMetric[]
  rows: Record<string, string>[]
}

export type IntegrationQueueItem = {
  id: string
  targetSystem: string
  documentNo: string
  idempotencyKey: string
  state: string
  lastAttempt: string
  errorMessage: string
}

export type RolePermission = {
  role: string
  scope: string
  description: string
  permissions: string[]
  dataScopes: string[]
}

export type BranchAccess = {
  branchId: string
  branchName: string
  region: string
  users: string
  dataIsolation: string
  approvalLimit: string
  modules: string[]
}

export type ModuleProgress = {
  module: string
  status: string
  done: number
  remaining: string
  nextCodeArea: string
}

export type SecurityModel = {
  roles: RolePermission[]
  branchScopes: BranchAccess[]
  moduleProgress: ModuleProgress[]
  guardRails: string[]
}

export type EtOpsFilters = {
  branchId: string
  protein: string
  period: string
  search: string
  groupBy: string
}

export type ModuleId =
  | 'dashboard'
  | 'operations'
  | 'production'
  | 'wms'
  | 'shipment'
  | 'reconciliation'
  | 'quality'
  | 'documents'
  | 'catalogs'
  | 'reports'
  | 'integrations'
  | 'security'
