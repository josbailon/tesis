// src/services/admin/userService.js
import { users } from '@/services/mocks.js'

export function fetchUsers() {
  return Promise.resolve([...users])
}

export function createUser(data) {
  const newUser = { id: Date.now(), ...data }
  users.push(newUser)
  return Promise.resolve(newUser)
}

export function updateUser(data) {
  const idx = users.findIndex(u => u.id === data.id)
  if (idx !== -1) users[idx] = { ...users[idx], ...data }
  return Promise.resolve(users[idx])
}

export function deleteUser(id) {
  const idx = users.findIndex(u => u.id === id)
  if (idx !== -1) users.splice(idx, 1)
  return Promise.resolve()
}
