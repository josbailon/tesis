import { defineStore } from 'pinia'
import * as caseService from '@/services/admin/caseService.js'

export const useCaseStore = defineStore('case', {
  state: () => ({
    cases: []
  }),
  actions: {
    async fetchCases() {
      this.cases = await caseService.fetchCases()
    },
    async updateCaseStatus({ id, status }) {
      const c = await caseService.updateCaseStatus({ id, status })
      this.cases = this.cases.map(x => x.id === c.id ? c : x)
    }
  }
})
