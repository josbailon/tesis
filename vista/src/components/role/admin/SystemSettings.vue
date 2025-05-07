<template>
  <div class="admin-page settings-page">
    <div class="settings-card">
      <header class="card-header">
        <h2>Configuración del Sistema</h2>
      </header>
      <div class="card-body">
        <form @submit.prevent="save" class="settings-form">
          <div class="form-group">
            <label for="encryptionKey">🛡️ Clave de cifrado</label>
            <input
              id="encryptionKey"
              v-model="form.encryptionKey"
              type="text"
              placeholder="Ingrese clave de cifrado"
              required
            />
          </div>
          <div class="form-group">
            <label for="smtpHost">📧 SMTP Host</label>
            <input
              id="smtpHost"
              v-model="form.smtpHost"
              type="text"
              placeholder="smtp.ejemplo.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="smtpPort">⚙️ SMTP Port</label>
            <input
              id="smtpPort"
              v-model.number="form.smtpPort"
              type="number"
              placeholder="587"
              required
            />
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" type="submit">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
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
  padding: 2rem;
  background: var(--gray-light);
  min-height: 100vh;
  font-family: var(--font-stack);
}

/* Card container */
.settings-card {
  max-width: 480px;
  margin: 0 auto;
  border-left: 6px solid var(--info);
  border-radius: 0.75rem;
  background: var(--white);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* Card header */
.card-header {
  background: var(--info);
  color: var(--white);
  padding: 1rem 1.5rem;
}
.card-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

/* Card body & form */
.card-body {
  padding: 1.5rem;
}
.settings-form {
  display: grid;
  gap: 1rem;
}

/* Form fields */
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.form-group input {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background: var(--gray-light);
  transition: border var(--transition);
  font-size: 0.9rem;
}
.form-group input:focus {
  border-color: var(--info);
  outline: none;
}

/* Form actions */
.form-actions {
  text-align: right;
  margin-top: 1rem;
}

/* Button */
.btn {
  padding: 0.6rem 1.2rem;
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
  background: #0056b3; /* darker blue */
  transform: translateY(-1px);
}
</style>
