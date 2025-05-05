<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold mb-4">Registro</h1>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div>
            <label class="block mb-1">Nombre completo</label>
            <input
              v-model="form.name"
              required
              class="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label class="block mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label class="block mb-1">Contraseña</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label class="block mb-1">Rol</label>
            <select v-model="form.role" class="w-full border px-3 py-2 rounded">
              <option value="student">Estudiante</option>
              <option value="patient">Paciente</option>
            </select>
          </div>
          <button
            type="submit"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Crear Cuenta
          </button>
        </form>
        <p class="mt-4 text-center">
          ¿Ya tienes cuenta?
          <router-link to="/login" class="text-blue-600 hover:underline">Inicia sesión</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useUserStore } from '@/store/userStore.js'
  import { useAuthStore } from '@/store/authStore.js'
  import { useRouter } from 'vue-router'
  
  const userStore = useUserStore()
  const auth = useAuthStore()
  const router = useRouter()
  
  const form = reactive({
    name: '',
    email: '',
    password: '',
    role: 'student'
  })
  
  async function onSubmit() {
    // Simula creación de usuario
    await userStore.createUser({
      name: form.name,
      email: form.email,
      role: form.role
    })
    // Auto-login tras registro
    auth.login({ role: form.role, email: form.email })
    if (form.role === 'admin') {
      router.push({ name: 'AdminDashboard' })
    } else {
      router.push('/')
    }
  }
  </script>
  
  <style scoped>
  /* Ajustes opcionales de diseño */
  </style>
  