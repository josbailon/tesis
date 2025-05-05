import { defineStore } from 'pinia'
import * as appointmentService from '@/services/admin/appointmentService.js'

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    appointments: []
  }),
  actions: {
    async fetchAppointments() {
      this.appointments = await appointmentService.fetchAppointments()
    },
    async updateAppointment({ id, status }) {
      const a = await appointmentService.updateAppointment({ id, status })
      this.appointments = this.appointments.map(x => x.id === a.id ? a : x)
    }
  }
})
