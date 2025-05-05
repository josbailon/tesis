<template>
    <div class="layout-container">
      <header class="header">
        <h1 class="logo">Medical Demo Admin</h1>
        <button class="logout-btn" @click="handleLogout">Cerrar sesión</button>
      </header>
      <div class="body">
        <AppSidebar />
        <main class="content">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import AppSidebar from '@/components/layout/AppSidebar.vue'
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
  .layout-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #12151a;
    color: #eceff1;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 24px;
    background: #1e272e;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
  }
  
  .logo {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
  
  .logout-btn {
    background: none;
    border: 1px solid #57606f;
    padding: 6px 12px;
    border-radius: 6px;
    color: #dcdde1;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .logout-btn:hover {
    background: #dcdde1;
    color: #1e272e;
  }
  
  .body {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  
  .content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    background: #12151a;
  }
  </style>
  