// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore.js'

// Public / Auth pages
import Login    from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'

// Admin layout & pages
import AdminLayout         from '@/components/role/admin/AdminLayout.vue'
import AdminDashboard      from '@/components/role/admin/AdminDashboard.vue'
import UserManagement      from '@/components/role/admin/UserManagement.vue'
import RoleManagement      from '@/components/role/admin/RoleManagement.vue'
import SpecialtyManagement from '@/components/role/admin/SpecialtyManagement.vue'
import PatientManagement   from '@/components/role/admin/PatientManagement.vue'
import CaseAudit           from '@/components/role/admin/CaseAudit.vue'
import AppointmentOverview from '@/components/role/admin/AppointmentOverview.vue'
import SystemSettings      from '@/components/role/admin/SystemSettings.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard
      },
      {
        path: 'users',
        name: 'UserManagement',
        component: UserManagement
      },
      {
        path: 'roles',
        name: 'RoleManagement',
        component: RoleManagement
      },
      {
        path: 'specialties',
        name: 'SpecialtyManagement',
        component: SpecialtyManagement
      },
      {
        path: 'patients',
        name: 'PatientManagement',
        component: PatientManagement
      },
      {
        path: 'cases',
        name: 'CaseAudit',
        component: CaseAudit
      },
      {
        path: 'appointments',
        name: 'AppointmentOverview',
        component: AppointmentOverview
      },
      {
        path: 'settings',
        name: 'SystemSettings',
        component: SystemSettings
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard: protect /admin and its children
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth) {
    if (!auth.isLoggedIn || auth.user.role !== to.meta.role) {
      return next({ name: 'Login' })
    }
  }
  next()
})

export default router
