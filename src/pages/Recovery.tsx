import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAppData } from '../context/AppDataContext'
import { FlameIcon } from '../components/FlameIcon'
import { cleanUsername } from '../utils/validation'
import type { Route } from '../components/Navigation'

interface RecoveryProps {
  onNavigate: (route: Route) => void
  onStartRecovery: (friendUsername: string, templateId: string) => void
  initialFriendUsername?: string
  initialTemplateId?: string
}

export function Recovery({ onNavigate, onStartRecovery, initialFriendUsername, initialTemplateId }: RecoveryProps) {
  const { t } = useLanguage()
  const { templates, settings } = useAppData()
  const [friendUsername, setFriendUsername] = useState(initialFriendUsername ?? '')
  const [templateId, setTemplateId] = useState(initialTemplateId ?? settings.defaultTemplateId ?? templates[0]?.id ?? '')
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialFriendUsername !== undefined) setFriendUsername(initialFriendUsername)
  }, [initialFriendUsername])

  useEffect(() => {
    if (initialTemplateId) setTemplateId(initialTemplateId)
  }, [initialTemplateId])

  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center text-center gap-3 rounded-3xl p-8 mt-6" style={{ background: 'var(--bg-sunken)' }}>
        <FlameIcon className="w-8 h-8" />
        <h3 className="font-display font-semibold">{t.templates.empty}</h3>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{t.templates.emptyBody}</p>
        <button
          onClick={() => onNavigate('templates')}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          {t.templates.create}
        </button>
      </div>
    )
  }

  const handleSubmit = () => {
    if (!friendUsername.trim()) {
      setError(t.errors.friendUsernameRequired)
      return
    }
    const activeId = templateId || settings.defaultTemplateId || templates[0].id
    onStartRecovery(cleanUsername(friendUsername), activeId)
  }

  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-6 max-w-lg">
      <header>
        <h1 className="font-display text-xl font-semibold mb-1">{t.dashboard.quickTitle}</h1>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{t.dashboard.quickSubtitle}</p>
      </header>

      <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--fg-muted)' }}>
            {t.preview.friendUsername}
          </label>
          <div className="flex items-center rounded-xl px-3 py-3" style={{ background: 'var(--bg-sunken)', border: `1px solid ${error ? '#e5342b' : 'var(--border)'}` }}>
            <span className="text-base me-1 select-none" style={{ color: 'var(--fg-muted)' }}>@</span>
            <input
              value={friendUsername}
              onChange={(e) => {
                setFriendUsername(e.target.value)
                setError('')
              }}
              placeholder={t.dashboard.friendPlaceholder.replace('@', '')}
              className="bg-transparent outline-none flex-1 text-base"
            />
          </div>
          {error && <p className="text-xs mt-1" style={{ color: '#e5342b' }}>{error}</p>}
        </div>

        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--fg-muted)' }}>
            {t.dashboard.templateLabel}
          </label>
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}
          >
            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          <FlameIcon className="w-5 h-5" />
          {t.dashboard.prepare}
        </button>
      </div>
    </div>
  )
}
