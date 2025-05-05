<template>
    <div class="admin-page">
      <h1 class="page-title">Configuración del Sistema</h1>
  
      <div class="table-card settings-card">
        <form @submit.prevent="save">
          <div class="form-group">
            <label for="encryptionKey">Clave de cifrado</label>
            <input
              id="encryptionKey"
              v-model="form.encryptionKey"
              type="text"
              placeholder="Ingrese clave de cifrado"
              required
            />
          </div>
          <div class="form-group">
            <label for="smtpHost">SMTP Host</label>
            <input
              id="smtpHost"
              v-model="form.smtpHost"
              type="text"
              placeholder="smtp.ejemplo.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="smtpPort">SMTP Port</label>
            <input
              id="smtpPort"
              v-model.number="form.smtpPort"
              type="number"
              placeholder="587"
              required
            />
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" type="submit">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue'
  import { useSettingsStore } from '@/store/settingsStore.js'
  
  const settingsStore = useSettingsStore()
  const form = reactive({
    encryptionKey: '',
    smtpHost: '',
    smtpPort: 587
  })
  
  onMounted(async () => {
    await settingsStore.fetchSettings()
    Object.assign(form, settingsStore.settings)
  })
  
  async function save() {
    await settingsStore.updateSettings(form)
    await settingsStore.fetchSettings()
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
    margin-bottom: 24px;
    text-align: center;
    color: #ffffff;
  }
  
  .table-card {
    background: #1e272e;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 500px;
    margin: 0 auto;
  }
  
  .settings-card {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #f5f6fa;
  }
  
  .form-group input {
    width: 100%;
    padding: 12px;
    background: #2f3640;
    border: 1px solid #57606f;
    border-radius: 6px;
    color: #eceff1;
    font-size: 14px;
    transition: border-color 0.2s;
  }
  
  .form-group input:focus {
    border-color: #00a8ff;
    outline: none;
  }
  
  .form-actions {
    text-align: right;
  }
  
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #00a8ff, #9c88ff);
    color: #ffffff;
  }
  
  .btn-primary:hover {
    background: linear-gradient(135deg, #0083cc, #7b6fd1);
    transform: translateY(-1px);
  }
  </style>
  