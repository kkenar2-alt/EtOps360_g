import type { SelectOption, SmartColumn } from './etops'

export type ControlCatalogSection = {
  id: string
  title: string
  description: string
  options: SelectOption[]
  requiredForOperation: boolean
}

export type TraceNode = {
  id: string
  stage: string
  label: string
  lot: string
  quantity: string
  status: string
  owner: string
  timestamp: string
}

export type TraceChain = {
  mainLot: string
  family: string
  summary: string
  nodes: TraceNode[]
}

export type WorkQueueItem = {
  id: string
  module: string
  priority: string
  title: string
  branch: string
  ownerRole: string
  dueText: string
  action: string
  status: string
}

export type QualityCheck = {
  id: string
  lot: string
  checkPoint: string
  productFamily: string
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
  columns: SmartColumn[]
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

export type ControlTowerData = {
  catalogs: ControlCatalogSection[]
  traceability: TraceChain
  workQueue: WorkQueueItem[]
  quality: QualityCheck[]
  reports: ReportDefinition[]
  integrationQueue: IntegrationQueueItem[]
}
