// src/services/mocks.js
export const users = [
    { id: 1, name: 'Ana Pérez', email: 'admin.com', role: 'admin' },
    { id: 2, name: 'Luis Gómez', email: 'luis@ejemplo.com', role: 'teacher' },
    { id: 3, name: 'María Ruiz', email: 'maria@ejemplo.com', role: 'student' },
    { id: 4, name: 'Pedro López', email: 'pedro@ejemplo.com', role: 'patient' }
  ]
  
  export const appointments = [
    { id: 1, date: '2025-05-04', hour: '10:00', studentName: 'Juan',  patientName: 'María',   status: 'pendiente' },
    { id: 2, date: '2025-05-04', hour: '11:00', studentName: 'Ana',   patientName: 'Carlos',  status: 'confirmado' }
  ]
  
  export const cases = [
    { id: 1, title: 'Caso 001', studentName: 'Pedro', status: 'pendiente' },
    { id: 2, title: 'Caso 002', studentName: 'Luisa', status: 'aprobado' }
  ]
  
  export const roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'teacher' },
    { id: 3, name: 'student' },
    { id: 4, name: 'patient' }
  ]
  
  export const specialties = [
    { id: 1, name: 'Cardiología' },
    { id: 2, name: 'Pediatría' }
  ]
  
  export const patients = [
    { id: 1, name: 'María Pérez', email: 'mperez@ejemplo.com', history: [] },
    { id: 2, name: 'Juan Díaz',   email: 'jdiaz@ejemplo.com',   history: [] }
  ]
  
  export let settings = {
    encryptionKey: 'mi_clave',
    smtpHost: 'smtp.ejemplo.com',
    smtpPort: 587
  }
  