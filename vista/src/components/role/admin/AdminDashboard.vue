<template>
    <div class="admin-page dashboard-container">
      <h1 class="page-title">Panel de Control</h1>
      <div class="cards-grid">
        <div class="card">
          <div class="card-icon">👥</div>
          <div class="card-label">Usuarios totales</div>
          <div class="card-value">{{ userCount }}</div>
        </div>
        <div class="card">
          <div class="card-icon">📅</div>
          <div class="card-label">Citas hoy</div>
          <div class="card-value">{{ todayAppointments }}</div>
        </div>
        <div class="card">
          <div class="card-icon">📂</div>
          <div class="card-label">Casos pendientes</div>
          <div class="card-value">{{ pendingCases }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue'
  import { useUserStore } from '@/store/userStore.js'
  import { useAppointmentStore } from '@/store/appointmentStore.js'
  import { useCaseStore } from '@/store/caseStore.js'
  
  const userStore = useUserStore()
  const appointmentStore = useAppointmentStore()
  const caseStore = useCaseStore()
  
  const userCount = computed(() => userStore.users.length)
  const todayAppointments = computed(() =>
    appointmentStore.appointments.filter(a => a.date === new Date().toISOString().slice(0,10)).length
  )
  const pendingCases = computed(() =>
    caseStore.cases.filter(c => c.status === 'pendiente').length
  )
  
  onMounted(async () => {
    await Promise.all([
      userStore.fetchUsers(),
      appointmentStore.fetchAppointments(),
      caseStore.fetchCases()
    ])
  })
  </script>
  
  <style scoped>
  /* Container and page styling */
  .admin-page {
    padding: 20px;
    background: #12151a;
    min-height: 100vh;
    color: #eceff1;
  }
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .page-title {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 32px;
    color: #ffffff;
  }
  
  /* Grid of cards */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
  }
  
  /* Individual card */
  .card {
    background: linear-gradient(135deg, #00a8ff, #9c88ff);
    border-radius: 12px;
    padding: 24px;
    color: #ffffff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
    overflow: hidden;
  }
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  }
  
  /* Card contents */
  .card-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }
  .card-label {
    font-size: 14px;
    opacity: 0.8;
  }
  .card-value {
    font-size: 28px;
    font-weight: 700;
    margin-top: 8px;
  }
  </style>
  