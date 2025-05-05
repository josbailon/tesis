<template>
    <div class="admin-page">
      <h1 class="page-title">Gestión de Pacientes</h1>
  
      <div class="table-card">
        <button class="btn btn-primary" @click="openModal(null)">
          Crear Paciente
        </button>
  
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Historial</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in patientStore.patients" :key="p.id">
              <td>{{ p.name }}</td>
              <td>{{ p.email }}</td>
              <td>{{ p.history?.length || 0 }}</td>
              <td>
                <button class="btn btn-secondary" @click="openModal(p)">
                  Editar
                </button>
                <button class="btn btn-danger" @click="remove(p.id)">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal -->
      <div v-if="modalOpen" class="modal-overlay">
        <div class="modal">
          <h2>{{ currentPatient ? 'Editar' : 'Crear' }} Paciente</h2>
          <form @submit.prevent="save">
            <div class="form-group">
              <label>Nombre</label>
              <input v-model="form.name" type="text" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" required />
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
  import { ref, reactive, onMounted } from 'vue'
  import { usePatientStore } from '@/store/patientStore.js'
  
  const patientStore = usePatientStore()
  const modalOpen = ref(false)
  const currentPatient = ref(null)
  const form = reactive({ name: '', email: '' })
  
  onMounted(() => {
    patientStore.fetchPatients()
  })
  
  function openModal(patient) {
    currentPatient.value = patient
    if (patient) {
      form.name = patient.name
      form.email = patient.email
    } else {
      form.name = ''
      form.email = ''
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
    await patientStore.deletePatient(id)
    await patientStore.fetchPatients()
  }
  
  function closeModal() {
    modalOpen.value = false
  }
  </script>
  
  <style scoped>
  .admin-page {
    padding: 20px;
    background: #12151a;
    min-height: 100vh;
    color: #eceff1;
  }
  
  .page-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .table-card {
    background: #1e272e;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow-x: auto;
  }
  
  .table-card table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
  }
  
  .table-card th,
  .table-card td {
    padding: 12px;
    text-align: left;
  }
  
  .table-card th {
    background: #2f3640;
    color: #dcdde1;
    font-weight: 600;
  }
  
  .table-card tr:nth-child(even) {
    background: #282c34;
  }
  
  .table-card tr:hover {
    background: #3d3f47;
  }
  
  .btn {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-right: 8px;
  }
  
  .btn-primary {
    background: #00a8ff;
    color: #ffffff;
  }
  
  .btn-primary:hover {
    background: #0083cc;
    transform: translateY(-1px);
  }
  
  .btn-secondary {
    background: #57606f;
    color: #ffffff;
  }
  
  .btn-secondary:hover {
    background: #414952;
    transform: translateY(-1px);
  }
  
  .btn-danger {
    background: #e84118;
    color: #ffffff;
  }
  
  .btn-danger:hover {
    background: #c23616;
    transform: translateY(-1px);
  }
  
  /* Modal styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal {
    background: #1e272e;
    color: #eceff1;
    border-radius: 12px;
    padding: 24px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  }
  
  .form-group {
    margin-bottom: 16px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 4px;
    font-weight: 600;
    color: #f5f6fa;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    background: #2f3640;
    border: 1px solid #57606f;
    border-radius: 6px;
    color: #eceff1;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
  </style>
  