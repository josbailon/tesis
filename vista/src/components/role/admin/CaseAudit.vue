<template>
  <div class="admin-page case-audit">
    <!-- Toolbar -->
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Buscar casos..."
        class="search-input"
        aria-label="Buscar casos"
      />
      <select v-model="filterStatus" class="status-filter" aria-label="Filtrar por estado">
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="aprobado">Aprobado</option>
        <option value="rechazado">Rechazado</option>
      </select>
    </div>

    <!-- Cases Table -->
    <div class="table-card">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Estudiante</th>
            <th>Estado</th>
            <th class="actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filteredCases" :key="c.id">
            <td>{{ c.title }}</td>
            <td>{{ c.studentName }}</td>
            <td>
              <span
                class="badge"
                :class="{
                  'badge-pending': c.status === 'pendiente',
                  'badge-confirmed': c.status === 'aprobado',
                  'badge-cancelled': c.status === 'rechazado'
                }"
              >
                {{ capitalize(c.status) }}
              </span>
            </td>
            <td>
              <button
                class="btn icon-btn btn-primary"
                @click="approve(c.id)"
                :disabled="c.status === 'aprobado'"
                title="Aprobar"
              >✔️</button>
              <button
                class="btn icon-btn btn-danger"
                @click="reject(c.id)"
                :disabled="c.status === 'rechazado'"
                title="Rechazar"
              >✖️</button>
            </td>
          </tr>
          <tr v-if="!filteredCases.length">
            <td colspan="4" class="no-data">No se encontraron casos clínicos.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCaseStore } from '@/store/caseStore.js'

const caseStore = useCaseStore()
const searchQuery = ref('')
const filterStatus = ref('')

// Fetch data
onMounted(() => caseStore.fetchCases())

// Filter logic
const filteredCases = computed(() =>
  caseStore.cases.filter(c => {
    const matchesSearch = [c.title, c.studentName]
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value
      ? c.status === filterStatus.value
      : true
    return matchesSearch && matchesStatus
  })
)

// Actions
async function approve(id) {
  await caseStore.updateCaseStatus({ id, status: 'aprobado' })
  await caseStore.fetchCases()
}
async function reject(id) {
  await caseStore.updateCaseStatus({ id, status: 'rechazado' })
  await caseStore.fetchCases()
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
.status-filter {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  transition: border var(--transition);
}
.search-input:focus,
.status-filter:focus {
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
  background: var(--purple);
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

/* Status badges */
.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--white);
}
.badge-pending   { background: var(--warning); color: var(--black); }
.badge-confirmed { background: var(--green);  }
.badge-cancelled { background: var(--red);    }

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
