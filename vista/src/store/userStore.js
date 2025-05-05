import { defineStore } from 'pinia'
import * as userService from '@/services/admin/userService.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: []
  }),
  actions: {
    async fetchUsers() {
      this.users = await userService.fetchUsers()
    },
    async createUser(payload) {
      const u = await userService.createUser(payload)
      this.users.push(u)
    },
    async updateUser(payload) {
      const u = await userService.updateUser(payload)
      this.users = this.users.map(x => x.id === u.id ? u : x)
    },
    async deleteUser(id) {
      await userService.deleteUser(id)
      this.users = this.users.filter(x => x.id !== id)
    }
  }
})
