<template>
  <div :class="['layout-container', themeClass]">
    <!-- Header -->
    <AppHeader
      @toggle-sidebar="collapsed = !collapsed"
      @theme-change="changeTheme"
      @search="onSearch"
    />

    <!-- Body: Sidebar + Content -->
    <div class="body">
      <AppSidebar @toggle-sidebar="collapsed = !collapsed" />
      <main :class="['content', { collapsed }]">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, provide } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const collapsed = ref(false)
provide('collapsed', collapsed)

// Theme management
const themes = ['light','dark','info','warning','purple','orange']
const currentTheme = ref(localStorage.getItem('admin-theme') || 'light')
const themeClass = computed(() => `theme-${currentTheme.value}`)

watch(currentTheme, val => {
  localStorage.setItem('admin-theme', val)
})

// Handle theme-change emitted by AppHeader
function changeTheme(theme) {
  if (themes.includes(theme)) {
    currentTheme.value = theme
  }
}

// Search handler (receives search query from AppHeader)
function onSearch(query) {
  // Puedes propagar este evento a componentes hijos o manejarlo aquí
  console.log('Buscar usuarios con:', query)
}
</script>

<style scoped>
/* Layout container uses global background variables */
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--gray-light);
  transition: background var(--transition), color var(--transition);
}

/* Body: flex between sidebar and content */
.body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Main content area */
.content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: var(--gray-light);
  transition: margin-left var(--transition);
}

/* Optional: when sidebar is collapsed, you might adjust padding/margin */
.content.collapsed {
  margin-left: 64px;
}
</style>
