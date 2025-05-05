<template>
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li>
            <RouterLink to="/admin" class="nav-link" active-class="active">
              <span class="icon">🏠</span>
              <span class="label">Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/users" class="nav-link" active-class="active">
              <span class="icon">👥</span>
              <span class="label">Usuarios</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/roles" class="nav-link" active-class="active">
              <span class="icon">🔑</span>
              <span class="label">Roles</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/specialties" class="nav-link" active-class="active">
              <span class="icon">⚕️</span>
              <span class="label">Especialidades</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/patients" class="nav-link" active-class="active">
              <span class="icon">🩺</span>
              <span class="label">Pacientes</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/cases" class="nav-link" active-class="active">
              <span class="icon">📂</span>
              <span class="label">Casos Clínicos</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/appointments" class="nav-link" active-class="active">
              <span class="icon">📅</span>
              <span class="label">Citas</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/settings" class="nav-link" active-class="active">
              <span class="icon">⚙️</span>
              <span class="label">Configuración</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  </script>
  
  <style scoped>
  .sidebar {
    width: 240px;
    background: #1e272e;
    color: #eceff1;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(255,255,255,0.1);
    height: 100vh;
  }
  
  .sidebar-header {
    padding: 24px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    text-align: center;
  }
  
  .sidebar-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
  
  .sidebar-nav {
    flex: 1;
    overflow-y: auto;
    margin-top: 16px;
  }
  
  .sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar-nav li {
    margin: 4px 0;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: #dcdde1;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.2s, color 0.2s;
  }
  
  .nav-link .icon {
    margin-right: 12px;
    font-size: 18px;
  }
  
  .nav-link:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
  
  .nav-link.active {
    background: linear-gradient(135deg, #00a8ff, #9c88ff);
    color: #ffffff;
  }
  
  .nav-link.active .icon {
    /* keep icon white when active */
    color: #ffffff;
  }
  
  /* Scrollbar styling for sidebar */
  .sidebar-nav::-webkit-scrollbar {
    width: 6px;
  }
  .sidebar-nav::-webkit-scrollbar-track {
    background: transparent;
  }
  .sidebar-nav::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 3px;
  }
  </style>
  