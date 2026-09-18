import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Language } from '../types'
import { strings, type AppStrings } from '../i18n/strings'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: AppStrings
  dir: 'rtl' | 'ltr'
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  children,
  initial,
  onChange,
}: {
  children: ReactNode
  initial: Language
  onChange: (lang: Language) => void
}) {
  const [language, setLanguageState] = useState<Language>(initial)
  const dir = language === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = language
  }, [language, dir])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    onChange(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: strings[language], dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
