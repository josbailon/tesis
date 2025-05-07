<template>
  <div class="admin-page patient-management">
    <!-- Toolbar -->
    <div class="toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Buscar pacientes..."
        class="search-input"
        aria-label="Buscar pacientes"
      />
      <button class="btn btn-primary" @click="openModal(null)">
        <span class="icon">➕</span> Crear Paciente
      </button>
    </div>

    <!-- Table Card -->
    <div class="table-card">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Edad</th>
            <th>Sangre</th>
            <th>Email</th>
            <th class="actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filteredPatients" :key="p.id">
            <td>{{ p.fullName }}</td>
            <td>{{ p.age }}</td>
            <td>
              <span class="badge blood-badge">{{ p.bloodType }}</span>
            </td>
            <td>{{ p.email }}</td>
            <td>
              <button
                class="btn icon-btn btn-secondary"
                @click="openModal(p)"
                title="Editar"
              >✏️</button>
              <button
                class="btn icon-btn btn-danger"
                @click="remove(p.id)"
                title="Eliminar"
              >🗑️</button>
            </td>
          </tr>
          <tr v-if="!filteredPatients.length">
            <td colspan="5" class="no-data">No se encontraron pacientes.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ currentPatient ? 'Editar' : 'Crear' }} Paciente</h2>
          <button class="close-btn" @click="closeModal" aria-label="Cerrar">×</button>
        </div>
        <form @submit.prevent="save" class="modal-form">
          <!-- Row 1: Name / Email -->
          <div class="form-row">
            <div class="form-group">
              <label>Nombre completo</label>
              <input v-model="form.fullName" type="text" placeholder="Ej. Juan Pérez" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" required />
            </div>
          </div>
          <!-- Row 2: Edad / Sangre -->
          <div class="form-row">
            <div class="form-group">
              <label>Edad</label>
              <input v-model.number="form.age" type="number" min="0" placeholder="Edad" required />
            </div>
            <div class="form-group">
              <label>Tipo de sangre</label>
              <select v-model="form.bloodType" required>
                <option disabled value="">Selecciona</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>
            </div>
          </div>
          <!-- Row 3: Nacionalidad -->
          <div class="form-row">
            <div class="form-group full-width">
              <label>Nacionalidad</label>
              <input v-model="form.nationality" type="text" placeholder="Nacionalidad" required />
            </div>
          </div>
          <!-- Row 4: Provincia / Cantón -->
          <div class="form-row">
            <div class="form-group">
              <label>Provincia</label>
              <input v-model="form.province" type="text" placeholder="Provincia" required />
            </div>
            <div class="form-group">
              <label>Cantón</label>
              <input v-model="form.canton" type="text" placeholder="Cantón" required />
            </div>
          </div>
          <!-- Row 5: Parroquia -->
          <div class="form-row">
            <div class="form-group full-width">
              <label>Parroquia</label>
              <input v-model="form.parish" type="text" placeholder="Parroquia" required />
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn btn-primary" type="submit">Guardar</button>
            <button class="btn btn-secondary" type="button" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { usePatientStore } from '@/store/patientStore.js'

const patientStore = usePatientStore()
const searchQuery = ref('')
const modalOpen = ref(false)
const currentPatient = ref(null)
const form = reactive({
  fullName: '',
  age: null,
  bloodType: '',
  nationality: '',
  province: '',
  canton: '',
  parish: '',
  email: ''
})

onMounted(() => patientStore.fetchPatients())

const filteredPatients = computed(() =>
  patientStore.patients.filter(p =>
    [p.fullName, p.email, p.bloodType]
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
)

function openModal(patient) {
  currentPatient.value = patient
  if (patient) {
    Object.assign(form, {
      fullName: patient.fullName,
      age: patient.age,
      bloodType: patient.bloodType,
      nationality: patient.nationality,
      province: patient.province,
      canton: patient.canton,
      parish: patient.parish,
      email: patient.email
    })
  } else {
    Object.assign(form, {
      fullName: '', age: null, bloodType: '',
      nationality: '', province: '', canton: '',
      parish: '', email: ''
    })
  }
  modalOpen.value = true
}

async function save() {
  if (currentPatient.value) {
    await patientStore.updatePatient({ id: currentPatient.value.id, ...form })
  } else {
    await patientStore.createPatient(form)
  }
  await patientStore.fetchPatients()
  closeModal()
}

async function remove(id) {
  if (confirm('¿Eliminar este paciente?')) {
    await patientStore.deletePatient(id)
    await patientStore.fetchPatients()
  }
}

function closeModal() {
  modalOpen.value = false
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

/* Blood badge */
.blood-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background: var(--warning);
  color: var(--black);
  font-weight: 600;
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
  background: var(--info);
  color: var(--white);
}
.btn-primary:hover {
  background: #0056b3;
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
  max-width: 500px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
/* Modal header */
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

/* Form layout */
.modal-form .form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.modal-form .form-row.full-width {
  flex: 1 1 100%;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 0.25rem;
  font-weight: 600;
}
.form-group input,
.form-group select {
  padding: 0.5rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background: var(--gray-light);
  transition: border var(--transition);
}
.form-group input:focus,
.form-group select:focus {
  border-color: var(--info);
  outline: none;
}

/* Modal actions */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
