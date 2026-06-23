import type { LoginResponse } from '../types/etops'

const storageKey = 'etops360.session'

export function readStoredSession(): LoginResponse | null {
  const raw = window.localStorage.getItem(storageKey)
  if (!raw) return null

  try {
    return JSON.parse(raw) as LoginResponse
  } catch {
    window.localStorage.removeItem(storageKey)
    return null
  }
}

export function storeSession(session: LoginResponse) {
  window.localStorage.setItem(storageKey, JSON.stringify(session))
}

export function clearSession() {
  window.localStorage.removeItem(storageKey)
}
