<template>
  <div class="admin-page appointment-management">
    <!-- Toolbar -->
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Buscar citas..."
        class="search-input"
        aria-label="Buscar citas"
      />
      <input
        v-model="filterDate"
        type="date"
        class="date-input"
        aria-label="Filtrar por fecha"
      />
    </div>

    <!-- Table Card -->
    <div class="table-card">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estudiante</th>
            <th>Paciente</th>
            <th>Estado</th>
            <th class="actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="a in filteredAppointments"
            :key="a.id"
          >
            <td>{{ a.date }}</td>
            <td>{{ a.hour }}</td>
            <td>{{ a.studentName }}</td>
            <td>{{ a.patientName }}</td>
            <td>
              <span
                class="badge"
                :class="{
                  'badge-confirmed': a.status === 'confirmado',
                  'badge-cancelled': a.status === 'cancelado',
                  'badge-pending': a.status === 'pendiente'
                }"
              >
                {{ capitalize(a.status) }}
              </span>
            </td>
            <td>
              <button
                class="btn icon-btn btn-primary"
                @click="confirm(a.id)"
                :disabled="a.status === 'confirmado'"
                title="Confirmar"
              >✔️</button>
              <button
                class="btn icon-btn btn-danger"
                @click="cancel(a.id)"
                :disabled="a.status === 'cancelado'"
                title="Cancelar"
              >✖️</button>
            </td>
          </tr>
          <tr v-if="!filteredAppointments.length">
            <td colspan="6" class="no-data">No se encontraron citas.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppointmentStore } from '@/store/appointmentStore.js'

const appointmentStore = useAppointmentStore()
const searchQuery = ref('')
const filterDate = ref('')

// Fetch on mount
onMounted(() => {
  appointmentStore.fetchAppointments()
})

// Filtered list
const filteredAppointments = computed(() => {
  return appointmentStore.appointments.filter(a => {
    const matchesSearch = [a.studentName, a.patientName, a.date, a.hour]
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    const matchesDate = filterDate.value
      ? a.date === filterDate.value
      : true
    return matchesSearch && matchesDate
  })
})

// Actions
async function confirm(id) {
  await appointmentStore.updateAppointment({ id, status: 'confirmado' })
  await appointmentStore.fetchAppointments()
}
async function cancel(id) {
  await appointmentStore.updateAppointment({ id, status: 'cancelado' })
  await appointmentStore.fetchAppointments()
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>

<style scoped>
.admin-page {
  padding: 2rem;
  background: var(--gray-light);
  min-height: 100vh;
  font-family: var(--font-stack);
}

/* Toolbar */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.search-input,
.date-input {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  transition: border var(--transition);
}
.search-input:focus,
.date-input:focus {
  border-color: var(--green);
  outline: none;
}

/* Table card */
.table-card {
  background: var(--white);
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  overflow: hidden;
}

/* Styled table */
.styled-table {
  width: 100%;
  border-collapse: collapse;
}
.styled-table thead {
  background: var(--info);
  position: sticky;
  top: 0;
  z-index: 1;
}
.styled-table th,
.styled-table td {
  padding: 0.75rem 1rem;
  text-align: left;
}
.styled-table thead th {
  color: var(--white);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
}
.styled-table tbody tr {
  border-bottom: 1px solid var(--gray-light);
  transition: background var(--transition);
}
.styled-table tbody tr:nth-child(odd) {
  background: var(--gray-light);
}
.styled-table tbody tr:hover {
  background: var(--gray);
}
.actions-col {
  width: 120px;
}

/* Badges */
.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--white);
}
.badge-confirmed {
  background: var(--green);
}
.badge-cancelled {
  background: var(--red);
}
.badge-pending {
  background: var(--warning);
  color: var(--black);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
}
.btn-primary {
  background: var(--green);
  color: var(--white);
}
.btn-primary:hover:not(:disabled) {
  background: var(--green-dark);
  transform: translateY(-1px);
}
.btn-danger {
  background: var(--red);
  color: var(--white);
}
.btn-danger:hover:not(:disabled) {
  background: var(--red-dark);
  transform: translateY(-1px);
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* No data */
.no-data {
  text-align: center;
  padding: 1rem;
  color: var(--gray-dark);
}
</style>
