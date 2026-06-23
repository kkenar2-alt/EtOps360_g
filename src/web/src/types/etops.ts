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
}

export type LoginProfile = {
  userName: string
  displayName: string
  role: string
  allowedBranchIds: string[]
  defaultBranchId: string
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
  operationColumns: SmartColumn[]
}

export type KpiCard = {
  id: string
  label: string
  value: string
  delta: string
  tone: 'good' | 'warning' | 'danger' | string
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
}

export type GeneratedDocument = {
  id: string
  documentNo: string
  status: string
  detailUrl: string
  message: string
}

export type EtOpsFilters = {
  branchId: string
  protein: string
  period: string
  search: string
  groupBy: string
}
