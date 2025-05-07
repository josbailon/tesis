<template>
  <div class="admin-page user-management">
    <!-- Toolbar -->
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Buscar usuarios..."
        class="search-input"
        aria-label="Buscar usuarios"
      />
      <button class="btn btn-primary" @click="openModal(null)">
        <span class="icon">➕</span> Crear Usuario
      </button>
    </div>

    <!-- Table Card -->
    <div class="table-card">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th class="actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in filteredUsers" :key="u.id">
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td>
              <span class="role-badge" :class="`badge-${u.role}`">
                {{ capitalize(u.role) }}
              </span>
            </td>
            <td>
              <button
                class="btn icon-btn btn-secondary"
                @click="openModal(u)"
                title="Editar"
              >✏️</button>
              <button
                class="btn icon-btn btn-danger"
                @click="remove(u.id)"
                title="Eliminar"
              >🗑️</button>
            </td>
          </tr>
          <tr v-if="!filteredUsers.length">
            <td colspan="4" class="no-data">No se encontraron usuarios.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ currentUser ? 'Editar' : 'Crear' }} Usuario</h2>
          <button class="close-btn" @click="closeModal" aria-label="Cerrar">&times;</button>
        </div>
        <form @submit.prevent="save">
          <div class="form-group">
            <label>Nombre</label>
            <input v-model="form.name" type="text" placeholder="Nombre completo" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" required />
          </div>
          <div class="form-group">
            <label>Rol</label>
            <select v-model="form.role">
              <option value="admin">Admin</option>
              <option value="teacher">Profesor</option>
              <option value="student">Estudiante</option>
              <option value="patient">Paciente</option>
            </select>
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
import { useUserStore } from '@/store/userStore.js'

const userStore = useUserStore()
const searchQuery = ref('')
const modalOpen = ref(false)
const currentUser = ref(null)
const form = reactive({ name: '', email: '', role: 'patient' })

onMounted(() => userStore.fetchUsers())

const filteredUsers = computed(() =>
  userStore.users.filter(u =>
    [u.name, u.email]
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
)

function openModal(user) {
  currentUser.value = user
  if (user) {
    Object.assign(form, { name: user.name, email: user.email, role: user.role })
  } else {
    Object.assign(form, { name: '', email: '', role: 'patient' })
  }
  modalOpen.value = true
}

async function save() {
  if (currentUser.value) {
    await userStore.updateUser({ id: currentUser.value.id, ...form })
  } else {
    await userStore.createUser(form)
  }
  await userStore.fetchUsers()
  closeModal()
}

async function remove(id) {
  if (confirm('¿Eliminar este usuario?')) {
    await userStore.deleteUser(id)
    await userStore.fetchUsers()
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
/* Layout */
.admin-page {
  padding: 2rem;
  background: var(--gray-light);
  min-height: 100vh;
  font-family: var(--font-stack);
}

/* Page title */
.page-title {
  display: none;
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
.styled-table th, .styled-table td {
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

/* Role badge */
.role-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--white);
  text-transform: capitalize;
}
.badge-admin    { background: var(--purple); }
.badge-teacher  { background: var(--info);   }
.badge-student  { background: var(--warning);}
.badge-patient  { background: var(--red);    }

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

/* No data */
.no-data {
  text-align: center;
  padding: 1rem;
  color: var(--gray-dark);
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
  width: 100%;
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
.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background: var(--gray-light);
  transition: border var(--transition);
}
.form-group input:focus,
.form-group select:focus {
  border-color: var(--green);
  outline: none;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
