export type ChatType = 'friend' | 'group' | 'best_friend' | 'other'

export interface UserProfile {
  username: string
  email: string
  phone: string
  chatType: ChatType
  updatedAt: string
}

export interface RecoveryTemplate {
  id: string
  name: string
  username: string
  email: string
  phone: string
  chatType: ChatType
  isDefault: boolean
  createdAt: string
}

export type RequestStatus = 'pending' | 'submitted' | 'recovered' | 'failed'

export interface RecoveryRequest {
  id: string
  username: string
  email: string
  phone: string
  chatType: ChatType
  friendUsername: string
  templateId: string
  templateName: string
  createdAt: string
  status: RequestStatus
}

export type Language = 'ar' | 'en'
export type ThemeMode = 'light' | 'dark' | 'system'

export interface AppSettings {
  language: Language
  theme: ThemeMode
  defaultTemplateId: string | null
  notifications: boolean
}
