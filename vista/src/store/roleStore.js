import { defineStore } from 'pinia'
import * as roleService from '@/services/admin/roleService.js'

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: []
  }),
  actions: {
    async fetchRoles() {
      this.roles = await roleService.fetchRoles()
    },
    async createRole(payload) {
      const r = await roleService.createRole(payload)
      this.roles.push(r)
    },
    async updateRole(payload) {
      const r = await roleService.updateRole(payload)
      this.roles = this.roles.map(x => x.id === r.id ? r : x)
    },
    async deleteRole(id) {
      await roleService.deleteRole(id)
      this.roles = this.roles.filter(x => x.id !== id)
    }
  }
})
