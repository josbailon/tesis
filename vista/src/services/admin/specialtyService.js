// src/services/admin/specialtyService.js
import { specialties } from '@/services/mocks.js'

export function fetchSpecialties() {
  return Promise.resolve([...specialties])
}

export function createSpecialty(data) {
  const newSpec = { id: Date.now(), ...data }
  specialties.push(newSpec)
  return Promise.resolve(newSpec)
}

export function updateSpecialty(data) {
  const idx = specialties.findIndex(s => s.id === data.id)
  if (idx !== -1) specialties[idx] = { ...specialties[idx], ...data }
  return Promise.resolve(specialties[idx])
}

export function deleteSpecialty(id) {
  const idx = specialties.findIndex(s => s.id === id)
  if (idx !== -1) specialties.splice(idx, 1)
  return Promise.resolve()
}
