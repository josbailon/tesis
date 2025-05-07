<!-- -->
<template>
  <div class="admin-page dashboard-container" role="main" aria-label="Panel de Control">
    <h1 class="page-title">Panel de Control</h1>

    <!-- Skeleton loaders mientras carga -->
    <div v-if="loading" class="cards-grid" role="grid">
      <div v-for="n in 3" :key="n" class="card skeleton" role="gridcell" aria-busy="true">
        <div class="skeleton-icon"></div>
        <div class="skeleton-label"></div>
        <div class="skeleton-value"></div>
      </div>
    </div>

    <!-- Contenido real -->
    <div v-else class="cards-grid" role="grid">
      <div class="card" v-for="({ icon, label, value }) in stats" :key="label" role="gridcell">
        <div class="card-icon">{{ icon }}</div>
        <div class="card-label">{{ label }}</div>
        <div class="card-value">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/store/userStore.js'
import { useAppointmentStore } from '@/store/appointmentStore.js'
import { useCaseStore } from '@/store/caseStore.js'

const userStore = useUserStore()
const appointmentStore = useAppointmentStore()
const caseStore = useCaseStore()

const loading = ref(true)

const userCount = computed(() => userStore.users.length)
const todayAppointments = computed(() =>
  appointmentStore.appointments.filter(a => a.date === new Date().toISOString().slice(0,10)).length
)
const pendingCases = computed(() =>
  caseStore.cases.filter(c => c.status === 'pendiente').length
)

const stats = computed(() => [
  { icon: '👥', label: 'Usuarios totales',  value: userCount.value },
  { icon: '📅', label: 'Citas hoy',        value: todayAppointments.value },
  { icon: '📂', label: 'Casos pendientes', value: pendingCases.value }
])

onMounted(async () => {
  loading.value = true
  await Promise.all([
    userStore.fetchUsers(),
    appointmentStore.fetchAppointments(),
    caseStore.fetchCases()
  ])
  // Pausa breve para mostrar el skeleton
  setTimeout(() => { loading.value = false }, 200)
})
</script>

<style scoped>
.admin-page {
  padding: 2rem;
  background: var(--gray-light);
  color: var(--black);
  font-family: var(--font-stack);
  min-height: 100vh;
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--green);
}

/* Grid responsive */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

/* Tarjeta */
.card {
  background: var(--white);
  border-radius: 0.75rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
  text-align: center;
  transition: transform var(--transition), box-shadow var(--transition);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}

/* Icono circula r*/
.card-icon {
  display: inline-flex;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--green-light);
  color: var(--green-dark);
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
  transition: background var(--transition), color var(--transition), transform var(--transition);
}

.card:hover .card-icon {
  background: rgba(220,53,69,0.1); /* rojo suave */
  color: var(--red-dark);
  transform: rotate(12deg) scale(1.1);
}

.card-label {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gray-dark);
  margin-bottom: 0.5rem;
}

.card-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--black);
}

/* Skeleton loader */
.skeleton {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  padding: 2rem 1.5rem;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0; left: -150px;
  height: 100%; width: 150px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  animation: shimmer 1.2s infinite;
}

.skeleton-icon,
.skeleton-label,
.skeleton-value {
  background: var(--gray);
  border-radius: 4px;
}

.skeleton-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 1rem;
}

.skeleton-label {
  width: 60%;
  height: 1rem;
  margin: 0 auto 0.5rem;
}

.skeleton-value {
  width: 40%;
  height: 1.5rem;
  margin: 0 auto;
}

@keyframes shimmer {
  0%   { transform: translateX(0); }
  100% { transform: translateX(300%); }
}
</style>
