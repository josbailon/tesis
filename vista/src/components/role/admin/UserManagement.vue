<template>
    <div class="admin-page">
      <h1 class="page-title">Gestión de Usuarios</h1>
  
      <div class="table-card">
        <button class="btn btn-primary" @click="openModal(null)">
          Crear Usuario
        </button>
  
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in userStore.users" :key="u.id">
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.role }}</td>
              <td>
                <button class="btn btn-secondary" @click="openModal(u)">
                  Editar
                </button>
                <button class="btn btn-danger" @click="remove(u.id)">
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
          <h2>{{ currentUser ? 'Editar' : 'Crear' }} Usuario</h2>
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
  import { ref, reactive, onMounted } from 'vue'
  import { useUserStore } from '@/store/userStore.js'
  
  const userStore = useUserStore()
  const modalOpen = ref(false)
  const currentUser = ref(null)
  const form = reactive({ name: '', email: '', role: 'patient' })
  
  onMounted(() => {
    userStore.fetchUsers()
  })
  
  function openModal(user) {
    currentUser.value = user
    if (user) {
      form.name = user.name
      form.email = user.email
      form.role = user.role
    } else {
      form.name = ''
      form.email = ''
      form.role = 'patient'
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
    await userStore.deleteUser(id)
    await userStore.fetchUsers()
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
    color: #ffffff;
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
  
  .form-group input,
  .form-group select {
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
  