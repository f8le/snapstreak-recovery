import { Home, Flame, LayoutTemplate, History, User, Settings } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { FlameIcon } from './FlameIcon'

export type Route = 'dashboard' | 'recovery' | 'templates' | 'history' | 'myInfo' | 'settings' | 'privacy'

interface NavigationProps {
  route: Route
  onNavigate: (route: Route) => void
}

export function BottomNav({ route, onNavigate }: NavigationProps) {
  const { t } = useLanguage()
  const items: { key: Route; label: string; icon: typeof Home }[] = [
    { key: 'dashboard', label: t.nav.dashboard, icon: Home },
    { key: 'recovery', label: t.nav.recovery, icon: Flame },
    { key: 'templates', label: t.nav.templates, icon: LayoutTemplate },
    { key: 'history', label: t.nav.history, icon: History },
    { key: 'settings', label: t.nav.settings, icon: Settings },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 pb-[env(safe-area-inset-bottom)]"
      style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-around px-1 py-1.5">
        {items.map(({ key, label, icon: Icon }) => {
          const active = route === key
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl min-w-[60px] transition-colors"
              style={{ color: active ? 'var(--fg)' : 'var(--fg-muted)' }}
              aria-current={active ? 'page' : undefined}
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                style={{ background: active ? 'var(--accent)' : 'transparent' }}
              >
                <Icon size={18} strokeWidth={2.2} color={active ? 'var(--accent-ink)' : 'currentColor'} />
              </span>
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function Sidebar({ route, onNavigate }: NavigationProps) {
  const { t } = useLanguage()
  const items: { key: Route; label: string; icon: typeof Home }[] = [
    { key: 'dashboard', label: t.nav.dashboard, icon: Home },
    { key: 'recovery', label: t.nav.recovery, icon: Flame },
    { key: 'templates', label: t.nav.templates, icon: LayoutTemplate },
    { key: 'history', label: t.nav.history, icon: History },
    { key: 'myInfo', label: t.nav.myInfo, icon: User },
    { key: 'settings', label: t.nav.settings, icon: Settings },
  ]

  return (
    <aside
      className="hidden md:flex w-64 shrink-0 flex-col h-screen sticky top-0 px-4 py-6"
      style={{ borderInlineEnd: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-2 px-2 mb-8">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-xl"
          style={{ background: 'var(--accent)' }}
        >
          <FlameIcon className="w-5 h-5" />
        </span>
        <span className="font-display font-semibold text-[15px] leading-tight">
          SnapStreak
          <br />
          Recovery
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map(({ key, label, icon: Icon }) => {
          const active = route === key
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-start"
              style={{
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? 'var(--accent-ink)' : 'var(--fg)',
              }}
            >
              <Icon size={18} strokeWidth={2.2} />
              {label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
