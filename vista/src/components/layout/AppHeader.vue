<template>
  <header class="header">
    <div class="header-left">
      <button
        class="btn-toggle"
        @click="$emit('toggle-sidebar')"
        aria-label="Toggle sidebar"
      >☰</button>
      <h1 class="logo">Medical Demo Admin</h1>
    </div>

    <div class="header-center">
      <div class="search-container">
        <input
          v-model="search"
          @keyup.enter="emitSearch"
          type="text"
          placeholder="🔍 Buscar..."
          aria-label="Buscar"
        />
        <button class="btn-search" @click="emitSearch" aria-label="Buscar">
          🔍
        </button>
      </div>
    </div>

    <div class="header-right">
      <select
        class="theme-selector"
        v-model="theme"
        @change="changeTheme"
        aria-label="Selector de tema"
      >
        <option v-for="t in themes" :key="t" :value="t">{{ capitalize(t) }}</option>
      </select>
      <button class="btn-logout" @click="handleLogout">
        Cerrar sesión
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/store/authStore.js'
import { useRouter } from 'vue-router'

const emit = defineEmits(['toggle-sidebar','theme-change','search'])
const search = ref('')
function emitSearch() {
  emit('search', search.value)
}

const themes = ['light','dark','info','warning','purple','orange']
const theme = ref(localStorage.getItem('admin-theme') || 'light')
watch(theme, val => {
  localStorage.setItem('admin-theme', val)
  emit('theme-change', val)
})
function changeTheme() {
  // the watch above will fire theme-change
}

const auth = useAuthStore()
const router = useRouter()
function handleLogout() {
  auth.logout()
  router.push({ name: 'Login' })
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--green);
  color: var(--white);
  padding: 0 1.5rem;
  height: 60px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.header-left, .header-center, .header-right {
  display: flex;
  align-items: center;
}

.btn-toggle {
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  margin-right: 1rem;
  cursor: pointer;
  transition: color var(--transition);
}
.btn-toggle:hover {
  color: var(--gray-light);
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-center {
  flex: 1;
  justify-content: center;
}

.search-container {
  position: relative;
  width: 100%;
  max-width: 300px;
}
.search-container input {
  width: 100%;
  padding: 0.4rem 2.5rem 0.4rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-size: 0.9rem;
}
.btn-search {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--gray-dark);
  font-size: 1rem;
  cursor: pointer;
}

.theme-selector {
  margin-right: 1rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  border: none;
  background: var(--white);
  color: var(--black);
  font-size: 0.9rem;
}

.btn-logout {
  background: var(--red);
  color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
}
.btn-logout:hover {
  background: var(--red-dark);
  transform: translateY(-2px);
}
</style>
