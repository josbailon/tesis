<template>
    <div class="admin-page">
      <h1 class="page-title">Gestión de Citas</h1>
  
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estudiante</th>
              <th>Paciente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in appointmentStore.appointments" :key="a.id">
              <td>{{ a.date }}</td>
              <td>{{ a.hour }}</td>
              <td>{{ a.studentName }}</td>
              <td>{{ a.patientName }}</td>
              <td>
                <button class="btn btn-primary" @click="confirm(a.id)">
                  Confirmar
                </button>
                <button class="btn btn-danger" @click="cancel(a.id)">
                  Cancelar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useAppointmentStore } from '@/store/appointmentStore.js'
  
  const appointmentStore = useAppointmentStore()
  
  onMounted(() => {
    appointmentStore.fetchAppointments()
  })
  
  async function confirm(id) {
    await appointmentStore.updateAppointment({ id, status: 'confirmado' })
    appointmentStore.fetchAppointments()
  }
  
  async function cancel(id) {
    await appointmentStore.updateAppointment({ id, status: 'cancelado' })
    appointmentStore.fetchAppointments()
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
    color: #ffffff;
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
    margin-right: 6px;
  }
  
  .btn-primary {
    background: #00a8ff;
    color: #ffffff;
  }
  
  .btn-primary:hover {
    background: #0083cc;
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
  </style>
  