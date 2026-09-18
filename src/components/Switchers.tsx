import { Moon, Sun, Monitor } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import type { ThemeMode } from '../types'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  return (
    <div
      className="inline-flex rounded-full p-0.5 text-xs font-semibold"
      style={{ background: 'var(--bg-sunken)' }}
    >
      {(['ar', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className="px-3 py-1.5 rounded-full transition-colors"
          style={
            language === lang
              ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
              : { color: 'var(--fg-muted)' }
          }
        >
          {lang === 'ar' ? 'العربية' : 'English'}
        </button>
      ))}
    </div>
  )
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const options: { key: ThemeMode; icon: typeof Sun }[] = [
    { key: 'light', icon: Sun },
    { key: 'dark', icon: Moon },
    { key: 'system', icon: Monitor },
  ]
  return (
    <div
      className="inline-flex rounded-full p-0.5"
      style={{ background: 'var(--bg-sunken)' }}
    >
      {options.map(({ key, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
          style={
            theme === key
              ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
              : { color: 'var(--fg-muted)' }
          }
          aria-label={key}
        >
          <Icon size={16} strokeWidth={2.2} />
        </button>
      ))}
    </div>
  )
}
