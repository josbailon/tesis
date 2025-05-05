import { defineStore } from 'pinia'
import * as specialtyService from '@/services/admin/specialtyService.js'

export const useSpecialtyStore = defineStore('specialty', {
  state: () => ({
    specialties: []
  }),
  actions: {
    async fetchSpecialties() {
      this.specialties = await specialtyService.fetchSpecialties()
    },
    async createSpecialty(payload) {
      const s = await specialtyService.createSpecialty(payload)
      this.specialties.push(s)
    },
    async updateSpecialty(payload) {
      const s = await specialtyService.updateSpecialty(payload)
      this.specialties = this.specialties.map(x => x.id === s.id ? s : x)
    },
    async deleteSpecialty(id) {
      await specialtyService.deleteSpecialty(id)
      this.specialties = this.specialties.filter(x => x.id !== id)
    }
  }
})
