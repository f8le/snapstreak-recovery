import { useMemo, useState } from 'react'
import { ArrowUpRight, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAppData } from '../context/AppDataContext'
import { FlameIcon } from '../components/FlameIcon'
import { cleanUsername } from '../utils/validation'
import type { Route } from '../components/Navigation'

interface DashboardProps {
  onNavigate: (route: Route) => void
  onStartRecovery: (friendUsername: string, templateId: string) => void
}

export function Dashboard({ onNavigate, onStartRecovery }: DashboardProps) {
  const { t } = useLanguage()
  const { profile, templates, settings, requests } = useAppData()
  const [friendUsername, setFriendUsername] = useState('')
  const [templateId, setTemplateId] = useState(settings.defaultTemplateId ?? templates[0]?.id ?? '')

  const activeTemplateId = templateId || settings.defaultTemplateId || templates[0]?.id || ''
  const activeTemplate = templates.find((t2) => t2.id === activeTemplateId)

  const recentRequests = useMemo(() => requests.slice(0, 5), [requests])

  const hasProfile = !!profile
  const hasTemplates = templates.length > 0

  const handleGo = () => {
    if (!friendUsername.trim() || !activeTemplate) return
    onStartRecovery(cleanUsername(friendUsername), activeTemplate.id)
  }

  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-6">
      <header>
        <div className="flex items-center gap-2 mb-1">
          <FlameIcon className="w-6 h-6" />
          <h1 className="font-display text-xl font-semibold">{t.appName}</h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{t.tagline}</p>
      </header>

      {!hasProfile ? (
        <EmptyBlock
          title={t.dashboard.emptyProfileTitle}
          body={t.dashboard.emptyProfileBody}
          cta={t.dashboard.addInfo}
          onClick={() => onNavigate('myInfo')}
        />
      ) : !hasTemplates ? (
        <EmptyBlock
          title={t.dashboard.emptyTemplateTitle}
          body={t.templates.emptyBody}
          cta={t.dashboard.createTemplateCta}
          onClick={() => onNavigate('templates')}
        />
      ) : (
        <section
          className="rounded-3xl p-5 md:p-6"
          style={{ background: 'var(--fg)', color: 'var(--bg)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-1">
            {t.dashboard.quickTitle}
          </p>
          <p className="text-lg font-display font-semibold mb-4">{t.dashboard.quickSubtitle}</p>

          <div
            className="flex items-center rounded-2xl px-4 py-3.5 mb-3"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <span className="opacity-60 me-1 text-lg select-none">@</span>
            <input
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
              placeholder={t.dashboard.friendPlaceholder.replace('@', '')}
              className="bg-transparent outline-none flex-1 text-lg placeholder:opacity-40"
              style={{ color: 'inherit' }}
              onKeyDown={(e) => e.key === 'Enter' && handleGo()}
            />
          </div>

          {templates.length > 1 && (
            <select
              value={activeTemplateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-sm mb-3 outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'inherit' }}
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id} style={{ color: '#000' }}>
                  {tpl.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGo}
            disabled={!friendUsername.trim()}
            className="w-full rounded-xl py-3.5 font-semibold text-base flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-40"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            <FlameIcon className="w-5 h-5" />
            {t.dashboard.go}
          </button>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-base font-semibold">{t.dashboard.recentRequests}</h2>
          {recentRequests.length > 0 && (
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-medium flex items-center gap-1"
              style={{ color: 'var(--fg-muted)' }}
            >
              {t.history.title} <ArrowUpRight size={13} />
            </button>
          )}
        </div>

        {recentRequests.length === 0 ? (
          <p className="text-sm rounded-2xl p-4 text-center" style={{ background: 'var(--bg-sunken)', color: 'var(--fg-muted)' }}>
            {t.dashboard.noRecent}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {recentRequests.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full shrink-0" style={{ background: 'var(--bg-sunken)' }}>
                  <FlameIcon className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">@{r.friendUsername}</p>
                  <p className="text-xs flex items-center gap-1" style={{ color: 'var(--fg-muted)' }}>
                    <Clock size={11} /> {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusPill status={r.status} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function EmptyBlock({ title, body, cta, onClick }: { title: string; body: string; cta: string; onClick: () => void }) {
  return (
    <div
      className="rounded-3xl p-6 text-center flex flex-col items-center gap-3"
      style={{ background: 'var(--bg-sunken)', border: '1px dashed var(--border)' }}
    >
      <FlameIcon className="w-8 h-8" />
      <div>
        <h3 className="font-display font-semibold mb-1">{title}</h3>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{body}</p>
      </div>
      <button
        onClick={onClick}
        className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform active:scale-95"
        style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
      >
        {cta}
      </button>
    </div>
  )
}

export function StatusPill({ status }: { status: 'pending' | 'submitted' | 'recovered' | 'failed' }) {
  const { t } = useLanguage()
  const colors: Record<string, { bg: string; fg: string }> = {
    pending: { bg: 'var(--bg-sunken)', fg: 'var(--fg-muted)' },
    submitted: { bg: '#fff3c4', fg: '#7a6300' },
    recovered: { bg: '#d7f5df', fg: '#0d6b32' },
    failed: { bg: '#fde0de', fg: '#a8261d' },
  }
  const c = colors[status]
  return (
    <span className="text-[11px] font-semibold px-2 py-1 rounded-full shrink-0" style={{ background: c.bg, color: c.fg }}>
      {t.status[status]}
    </span>
  )
}
