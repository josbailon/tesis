// src/services/admin/caseService.js
import { cases } from '@/services/mocks.js'

export function fetchCases() {
  return Promise.resolve([...cases])
}

export function updateCaseStatus({ id, status }) {
  const idx = cases.findIndex(c => c.id === id)
  if (idx !== -1) cases[idx].status = status
  return Promise.resolve(cases[idx])
}
