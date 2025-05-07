<template>
  <aside :class="['sidebar', { collapsed }]">
    <div class="sidebar-header">
      <h2 v-if="!collapsed">Admin Panel</h2>
      <button class="collapse-btn" @click="$emit('toggle-sidebar')" aria-label="Toggle sidebar">
        <span v-if="collapsed">»</span>
        <span v-else>«</span>
      </button>
    </div>
    <nav class="nav-list" role="navigation">
      <ul>
        <li v-for="item in menu" :key="item.label" class="nav-item">
          <RouterLink :to="item.to" class="nav-link" active-class="active">
            <span class="icon">{{ item.icon }}</span>
            <span v-if="!collapsed" class="label">{{ item.label }}</span>
          </RouterLink>
          <span v-if="collapsed" class="tooltip">{{ item.label }}</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { inject, defineEmits } from 'vue'
import { RouterLink } from 'vue-router'

const collapsed = inject('collapsed', false)
const emit = defineEmits(['toggle-sidebar'])

const menu = [
  { to: { name: 'AdminDashboard' }, icon: '🏠', label: 'Dashboard' },
  { to: { name: 'UserManagement' }, icon: '👥', label: 'Usuarios' },
  { to: { name: 'RoleManagement' }, icon: '🔑', label: 'Roles' },
  { to: { name: 'SpecialtyManagement' }, icon: '⚕️', label: 'Especialidades' },
  { to: { name: 'PatientManagement' }, icon: '🩺', label: 'Pacientes' },
  { to: { name: 'CaseAudit' }, icon: '📂', label: 'Casos Clínicos' },
  { to: { name: 'AppointmentOverview' }, icon: '📅', label: 'Citas' },
  { to: { name: 'SystemSettings' }, icon: '⚙️', label: 'Configuración' },
]
</script>

<style scoped>
/* Uses global CSS variables: --white, --black, --green, --gray, --gray-light, --red, --transition */

.sidebar {
  width: 240px;
  background: var(--white);
  color: var(--black);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--gray);
  transition: width var(--transition);
  overflow: hidden;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--green);
  padding: 1rem;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--white);
}

.collapse-btn {
  background: none;
  border: none;
  color: var(--white);
  font-size: 1rem;
  cursor: pointer;
  transition: transform var(--transition);
}
.collapse-btn:hover {
  transform: scale(1.1);
}

.nav-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.nav-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--black);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background var(--transition), color var(--transition);
}

.nav-link .icon {
  font-size: 1.25rem;
  margin-right: 0.75rem;
}

.nav-link:hover {
  background: var(--gray-light);
}

.nav-link.active {
  background: var(--green);
  color: var(--white);
}

.nav-link.active .icon {
  color: var(--white);
}

.label {
  flex: 1;
}

/* Tooltip on collapsed */
.tooltip {
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--gray);
  color: var(--white);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  font-size: 0.75rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition);
}

.sidebar.collapsed .nav-item:hover .tooltip {
  opacity: 1;
}

/* scrollbar styling */
.nav-list::-webkit-scrollbar {
  width: 6px;
}
.nav-list::-webkit-scrollbar-track {
  background: transparent;
}
.nav-list::-webkit-scrollbar-thumb {
  background: var(--gray);
  border-radius: 3px;
}
</style>
