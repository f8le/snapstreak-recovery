import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AppSettings, RecoveryRequest, RecoveryTemplate, UserProfile } from '../types'
import { storage, uid } from '../services/storage'

interface AppDataContextValue {
  profile: UserProfile | null
  saveProfile: (profile: Omit<UserProfile, 'updatedAt'>) => void

  templates: RecoveryTemplate[]
  addTemplate: (tpl: Omit<RecoveryTemplate, 'id' | 'createdAt' | 'isDefault'>) => RecoveryTemplate
  updateTemplate: (id: string, tpl: Partial<RecoveryTemplate>) => void
  deleteTemplate: (id: string) => void
  duplicateTemplate: (id: string) => void
  setDefaultTemplate: (id: string) => void

  requests: RecoveryRequest[]
  addRequest: (req: Omit<RecoveryRequest, 'id' | 'createdAt' | 'status'>) => RecoveryRequest
  updateRequestStatus: (id: string, status: RecoveryRequest['status']) => void
  deleteRequest: (id: string) => void

  settings: AppSettings
  updateSettings: (patch: Partial<AppSettings>) => void

  deleteAllData: () => void
}

const AppDataContext = createContext<AppDataContextValue | null>(null)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(() => storage.getProfile())
  const [templates, setTemplates] = useState<RecoveryTemplate[]>(() => storage.getTemplates())
  const [requests, setRequests] = useState<RecoveryRequest[]>(() => storage.getRequests())
  const [settings, setSettings] = useState<AppSettings>(() => storage.getSettings())

  const saveProfile: AppDataContextValue['saveProfile'] = (p) => {
    const next: UserProfile = { ...p, updatedAt: new Date().toISOString() }
    setProfile(next)
    storage.saveProfile(next)
  }

  const addTemplate: AppDataContextValue['addTemplate'] = (tpl) => {
    const isFirst = templates.length === 0
    const newTpl: RecoveryTemplate = {
      ...tpl,
      id: uid(),
      createdAt: new Date().toISOString(),
      isDefault: isFirst,
    }
    const next = [...templates, newTpl]
    setTemplates(next)
    storage.saveTemplates(next)
    if (isFirst) {
      const nextSettings = { ...settings, defaultTemplateId: newTpl.id }
      setSettings(nextSettings)
      storage.saveSettings(nextSettings)
    }
    return newTpl
  }

  const updateTemplate: AppDataContextValue['updateTemplate'] = (id, patch) => {
    const next = templates.map((t) => (t.id === id ? { ...t, ...patch } : t))
    setTemplates(next)
    storage.saveTemplates(next)
  }

  const deleteTemplate: AppDataContextValue['deleteTemplate'] = (id) => {
    const next = templates.filter((t) => t.id !== id)
    setTemplates(next)
    storage.saveTemplates(next)
    if (settings.defaultTemplateId === id) {
      const nextSettings = { ...settings, defaultTemplateId: next[0]?.id ?? null }
      setSettings(nextSettings)
      storage.saveSettings(nextSettings)
    }
  }

  const duplicateTemplate: AppDataContextValue['duplicateTemplate'] = (id) => {
    const src = templates.find((t) => t.id === id)
    if (!src) return
    const copy: RecoveryTemplate = {
      ...src,
      id: uid(),
      name: `${src.name} (2)`,
      isDefault: false,
      createdAt: new Date().toISOString(),
    }
    const next = [...templates, copy]
    setTemplates(next)
    storage.saveTemplates(next)
  }

  const setDefaultTemplate: AppDataContextValue['setDefaultTemplate'] = (id) => {
    const next = templates.map((t) => ({ ...t, isDefault: t.id === id }))
    setTemplates(next)
    storage.saveTemplates(next)
    const nextSettings = { ...settings, defaultTemplateId: id }
    setSettings(nextSettings)
    storage.saveSettings(nextSettings)
  }

  const addRequest: AppDataContextValue['addRequest'] = (req) => {
    const newReq: RecoveryRequest = {
      ...req,
      id: uid(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    }
    const next = [newReq, ...requests]
    setRequests(next)
    storage.saveRequests(next)
    return newReq
  }

  const updateRequestStatus: AppDataContextValue['updateRequestStatus'] = (id, status) => {
    const next = requests.map((r) => (r.id === id ? { ...r, status } : r))
    setRequests(next)
    storage.saveRequests(next)
  }

  const deleteRequest: AppDataContextValue['deleteRequest'] = (id) => {
    const next = requests.filter((r) => r.id !== id)
    setRequests(next)
    storage.saveRequests(next)
  }

  const updateSettings: AppDataContextValue['updateSettings'] = (patch) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    storage.saveSettings(next)
  }

  const deleteAllData = () => {
    storage.clearAll()
    setProfile(null)
    setTemplates([])
    setRequests([])
    setSettings(storage.getSettings())
  }

  return (
    <AppDataContext.Provider
      value={{
        profile,
        saveProfile,
        templates,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        duplicateTemplate,
        setDefaultTemplate,
        requests,
        addRequest,
        updateRequestStatus,
        deleteRequest,
        settings,
        updateSettings,
        deleteAllData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
