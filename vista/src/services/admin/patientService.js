// src/services/admin/patientService.js
import { patients } from '@/services/mocks.js'

export function fetchPatients() {
  return Promise.resolve([...patients])
}

export function createPatient(data) {
  const newPatient = { id: Date.now(), history: [], ...data }
  patients.push(newPatient)
  return Promise.resolve(newPatient)
}

export function updatePatient(data) {
  const idx = patients.findIndex(p => p.id === data.id)
  if (idx !== -1) patients[idx] = { ...patients[idx], ...data }
  return Promise.resolve(patients[idx])
}

export function deletePatient(id) {
  const idx = patients.findIndex(p => p.id === id)
  if (idx !== -1) patients.splice(idx, 1)
  return Promise.resolve()
}
