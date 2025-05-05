<template>
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Medical Demo Admin</h1>
      <button @click="handleLogout" class="px-3 py-1 bg-red-500 text-white rounded">
        Cerrar sesión
      </button>
    </header>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/store/authStore.js'
  import { useRouter } from 'vue-router'
  
  const auth = useAuthStore()
  const router = useRouter()
  
  function handleLogout() {
    auth.logout()
    router.push({ name: 'Login' })
  }
  </script>
  
  <style scoped>
  /* Ajusta colores o paddings si necesitas */
  </style>
  