<template>
    <div class="login-container">
      <div class="login-card">
        <h1>BIENVENIDO </h1>
        <p>Inicia sesión para acceder a tu cuenta y gestionar tus servicios</p>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input
              id="username"
              type="text"
              v-model="form.email"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="password">
              Contraseña
              <RouterLink to="/forgot" class="forgot">¿Olvidaste tu contraseña?</RouterLink>
            </label>
            <input
              id="password"
              type="password"
              v-model="form.password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
  
          <div class="form-group checkbox">
            <input id="remember" type="checkbox" v-model="form.remember" />
            <label for="remember">Recordarme</label>
          </div>
  
          <button type="submit">Iniciar Sesión</button>
        </form>
  
        <p class="register-link">
          ¿No tienes una cuenta? <RouterLink to="/register">Regístrate</RouterLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useAuthStore } from '@/store/authStore.js'
  import { useRouter, RouterLink } from 'vue-router'
  
  const auth = useAuthStore()
  const router = useRouter()
  
  const form = reactive({
    email: '',
    password: '',
    remember: false,
    role: 'admin'
  })
  
  function onSubmit() {
    auth.login({ role: form.role, email: form.email })
    router.push({ name: 'AdminDashboard' })
  }
  </script>
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    background: radial-gradient(circle at top left, #2c3e50, #000000);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .login-card {
    background: #1e272e;
    padding: 40px;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .login-card h1 {
    margin-bottom: 10px;
    font-size: 28px;
    color: #f5f6fa;
  }
  
  .login-card p {
    margin-bottom: 30px;
    color: #dcdde1;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #f5f6fa;
    font-weight: 600;
  }
  
  .form-group input[type="text"],
  .form-group input[type="password"] {
    width: 100%;
    padding: 12px 14px;
    background: #404756;
    color: #ffffff;
    border: 1px solid #57606f;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.3s;
  }
  
  .form-group input[type="text"]:focus,
  .form-group input[type="password"]:focus {
    border-color: #00a8ff;
    outline: none;
  }
  
  .form-group.checkbox {
    display: flex;
    align-items: center;
  }
  
  .form-group.checkbox input {
    margin-right: 10px;
    accent-color: #00a8ff;
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #00a8ff, #9c88ff);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  button[type="submit"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 168, 255, 0.4);
  }
  
  .forgot {
    float: right;
    font-size: 13px;
    color: #00a8ff;
    text-decoration: none;
  }
  
  .forgot:hover {
    text-decoration: underline;
  }
  
  .register-link {
    margin-top: 25px;
    font-size: 14px;
    color: #dcdde1;
  }
  
  .register-link a {
    color: #9c88ff;
    text-decoration: none;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  </style>
  