import { defineStore } from 'pinia'
import * as settingsService from '@/services/admin/settingsService.js'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: {}
  }),
  actions: {
    async fetchSettings() {
      this.settings = await settingsService.fetchSettings()
    },
    async updateSettings(payload) {
      const s = await settingsService.updateSettings(payload)
      this.settings = s
    }
  }
})
