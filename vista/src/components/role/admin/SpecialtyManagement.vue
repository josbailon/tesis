<template>
  <div class="admin-page specialty-management">
    <!-- Toolbar -->
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Buscar especialidades..."
        class="search-input"
        aria-label="Buscar especialidades"
      />
      <button class="btn btn-primary" @click="openModal(null)">
        <span class="icon">➕</span> Crear Especialidad
      </button>
    </div>

    <!-- Table Card -->
    <div class="table-card">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Especialidad</th>
            <th class="actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in filteredSpecialties" :key="s.id">
            <td>{{ s.name }}</td>
            <td>
              <button
                class="btn icon-btn btn-secondary"
                @click="openModal(s)"
                title="Editar"
              >✏️</button>
              <button
                class="btn icon-btn btn-danger"
                @click="remove(s.id)"
                title="Eliminar"
              >🗑️</button>
            </td>
          </tr>
          <tr v-if="!filteredSpecialties.length">
            <td colspan="2" class="no-data">No se encontraron especialidades.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ currentSpecialty ? 'Editar' : 'Crear' }} Especialidad</h2>
          <button class="close-btn" @click="closeModal" aria-label="Cerrar">×</button>
        </div>
        <form @submit.prevent="save">
          <div class="form-group">
            <label>Nombre de la Especialidad</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Ej. Cardiología"
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
import { useSpecialtyStore } from '@/store/specialtyStore.js'

const specialtyStore = useSpecialtyStore()
const searchQuery = ref('')
const modalOpen = ref(false)
const currentSpecialty = ref(null)
const form = reactive({ name: '' })

onMounted(() => specialtyStore.fetchSpecialties())

const filteredSpecialties = computed(() =>
  specialtyStore.specialties.filter(s =>
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

function openModal(specialty) {
  currentSpecialty.value = specialty
  form.name = specialty ? specialty.name : ''
  modalOpen.value = true
}

async function save() {
  if (currentSpecialty.value) {
    await specialtyStore.updateSpecialty({ id: currentSpecialty.value.id, ...form })
  } else {
    await specialtyStore.createSpecialty(form)
  }
  await specialtyStore.fetchSpecialties()
  closeModal()
}

async function remove(id) {
  if (confirm('¿Eliminar esta especialidad?')) {
    await specialtyStore.deleteSpecialty(id)
    await specialtyStore.fetchSpecialties()
  }
}

function closeModal() {
  modalOpen.value = false
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
  background: var(--purple);
  color: var(--white);
}
.btn-primary:hover {
  background: #59359c; /* darker purple */
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
.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background: var(--gray-light);
  transition: border var(--transition);
}
.form-group input:focus {
  border-color: var(--purple);
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
