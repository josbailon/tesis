<template>
  <div class="admin-page role-management">
    <!-- Toolbar -->
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Buscar roles..."
        class="search-input"
        aria-label="Buscar roles"
      />
      <button class="btn btn-primary" @click="openModal(null)">
        <span class="icon">➕</span> Crear Rol
      </button>
    </div>

    <!-- Roles table -->
    <div class="table-card">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Rol</th>
            <th class="actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in filteredRoles" :key="r.id">
            <td>{{ capitalize(r.name) }}</td>
            <td>
              <button
                class="btn icon-btn btn-secondary"
                @click="openModal(r)"
                title="Editar rol"
              >✏️</button>
              <button
                class="btn icon-btn btn-danger"
                @click="remove(r.id)"
                title="Eliminar rol"
              >🗑️</button>
            </td>
          </tr>
          <tr v-if="!filteredRoles.length">
            <td colspan="2" class="no-data">No se encontraron roles.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ currentRole ? 'Editar' : 'Crear' }} Rol</h2>
          <button class="close-btn" @click="closeModal" aria-label="Cerrar">×</button>
        </div>
        <form @submit.prevent="save">
          <div class="form-group">
            <label>Nombre del Rol</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Ej. Profesor"
              required
            />
          </div>
          <div class="modal-actions">
            <button class="btn btn-primary" type="submit">Guardar</button>
            <button class="btn btn-secondary" type="button" @click="closeModal">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoleStore } from '@/store/roleStore.js'

const roleStore = useRoleStore()
const searchQuery = ref('')
const modalOpen = ref(false)
const currentRole = ref(null)
const form = reactive({ name: '' })

onMounted(() => roleStore.fetchRoles())

const filteredRoles = computed(() =>
  roleStore.roles.filter(r =>
    r.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

function openModal(role) {
  currentRole.value = role
  form.name = role ? role.name : ''
  modalOpen.value = true
}

async function save() {
  if (currentRole.value) {
    await roleStore.updateRole({ id: currentRole.value.id, ...form })
  } else {
    await roleStore.createRole(form)
  }
  await roleStore.fetchRoles()
  closeModal()
}

async function remove(id) {
  if (confirm('¿Eliminar este rol?')) {
    await roleStore.deleteRole(id)
    await roleStore.fetchRoles()
  }
}

function closeModal() {
  modalOpen.value = false
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>

<style scoped>
/* Container */
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
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  transition: border var(--transition);
}
.search-input:focus {
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
  background: var(--green);
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

/* No data */
.no-data {
  text-align: center;
  padding: 1rem;
  color: var(--gray-dark);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
}
.btn-primary {
  background: var(--green);
  color: var(--white);
}
.btn-primary:hover {
  background: var(--green-dark);
}
.btn-secondary {
  background: var(--gray);
  color: var(--black);
}
.btn-secondary:hover {
  background: var(--gray-dark);
  color: var(--white);
}
.btn-danger {
  background: var(--red);
  color: var(--white);
}
.btn-danger:hover {
  background: var(--red-dark);
}
.icon-btn {
  padding: 0.5rem;
  font-size: 1rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: var(--white);
  border-radius: 0.75rem;
  width: 90%;
  max-width: 420px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray-dark);
}
.close-btn:hover {
  color: var(--red);
}

/* Form */
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}
.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background: var(--gray-light);
  transition: border var(--transition);
}
.form-group input:focus {
  border-color: var(--green);
  outline: none;
}

/* Modal actions */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
</style>
