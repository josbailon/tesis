import { defineStore } from 'pinia'
import * as patientService from '@/services/admin/patientService.js'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: []
  }),
  actions: {
    async fetchPatients() {
      this.patients = await patientService.fetchPatients()
    },
    async createPatient(payload) {
      const p = await patientService.createPatient(payload)
      this.patients.push(p)
    },
    async updatePatient(payload) {
      const p = await patientService.updatePatient(payload)
      this.patients = this.patients.map(x => x.id === p.id ? p : x)
    },
    async deletePatient(id) {
      await patientService.deletePatient(id)
      this.patients = this.patients.filter(x => x.id !== id)
    }
  }
})
