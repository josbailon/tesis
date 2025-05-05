// src/services/admin/settingsService.js
import { settings } from '@/services/mocks.js'

export function fetchSettings() {
  return Promise.resolve({ ...settings })
}

export function updateSettings(data) {
  settings.encryptionKey = data.encryptionKey
  settings.smtpHost      = data.smtpHost
  settings.smtpPort      = data.smtpPort
  return Promise.resolve({ ...settings })
}
