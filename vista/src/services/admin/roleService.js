// src/services/admin/roleService.js
import { roles } from '@/services/mocks.js'

export function fetchRoles() {
  return Promise.resolve([...roles])
}

export function createRole(data) {
  const newRole = { id: Date.now(), ...data }
  roles.push(newRole)
  return Promise.resolve(newRole)
}

export function updateRole(data) {
  const idx = roles.findIndex(r => r.id === data.id)
  if (idx !== -1) roles[idx] = { ...roles[idx], ...data }
  return Promise.resolve(roles[idx])
}

export function deleteRole(id) {
  const idx = roles.findIndex(r => r.id === id)
  if (idx !== -1) roles.splice(idx, 1)
  return Promise.resolve()
}
