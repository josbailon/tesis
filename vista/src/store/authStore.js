import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: { role: null, email: null },
    isLoggedIn: false
  }),
  actions: {
    login(userData) {
      this.user = userData
      this.isLoggedIn = true
    },
    logout() {
      this.user = { role: null, email: null }
      this.isLoggedIn = false
    }
  }
})
