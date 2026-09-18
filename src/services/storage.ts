import type { AppSettings, RecoveryRequest, RecoveryTemplate, UserProfile } from '../types'

// Local-only persistence. No passwords, sessions, cookies, or Snapchat
// credentials are ever stored here — only the recovery-request form data
// the user chooses to save.

const KEYS = {
  profile: 'ssr:profile',
  templates: 'ssr:templates',
  requests: 'ssr:requests',
  settings: 'ssr:settings',
} as const

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage unavailable (private mode, quota) — fail silently, UI still works in-memory
  }
}

export const defaultSettings: AppSettings = {
  language: 'ar',
  theme: 'system',
  defaultTemplateId: null,
  notifications: true,
}

export const storage = {
  getProfile(): UserProfile | null {
    return read<UserProfile | null>(KEYS.profile, null)
  },
  saveProfile(profile: UserProfile) {
    write(KEYS.profile, profile)
  },

  getTemplates(): RecoveryTemplate[] {
    return read<RecoveryTemplate[]>(KEYS.templates, [])
  },
  saveTemplates(templates: RecoveryTemplate[]) {
    write(KEYS.templates, templates)
  },

  getRequests(): RecoveryRequest[] {
    return read<RecoveryRequest[]>(KEYS.requests, [])
  },
  saveRequests(requests: RecoveryRequest[]) {
    write(KEYS.requests, requests)
  },

  getSettings(): AppSettings {
    return read<AppSettings>(KEYS.settings, defaultSettings)
  },
  saveSettings(settings: AppSettings) {
    write(KEYS.settings, settings)
  },

  clearAll() {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
  },
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
