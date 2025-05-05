// src/services/admin/appointmentService.js
import { appointments } from '@/services/mocks.js'

export function fetchAppointments() {
  return Promise.resolve([...appointments])
}

export function updateAppointment({ id, status }) {
  const idx = appointments.findIndex(a => a.id === id)
  if (idx !== -1) appointments[idx].status = status
  return Promise.resolve(appointments[idx])
}
