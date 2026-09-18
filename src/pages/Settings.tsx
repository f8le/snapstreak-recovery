import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useAppData } from '../context/AppDataContext'
import { useToast } from '../context/ToastContext'
import { LanguageSwitcher, ThemeSwitcher } from '../components/Switchers'
import { ConfirmDialog } from '../components/ConfirmDialog'
import type { Route } from '../components/Navigation'

interface SettingsProps {
  onNavigate: (route: Route) => void
}

export function SettingsPage({ onNavigate }: SettingsProps) {
  const { t } = useLanguage()
  useTheme()
  const { templates, settings, updateSettings, deleteAllData } = useAppData()
  const { showToast } = useToast()
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-6 max-w-lg">
      <header>
        <h1 className="font-display text-xl font-semibold">{t.settings.title}</h1>
      </header>

      <Row label={t.settings.language}>
        <LanguageSwitcher />
      </Row>

      <Row label={t.settings.theme}>
        <ThemeSwitcher />
      </Row>

      <Row label={t.settings.defaultTemplate}>
        <select
          value={settings.defaultTemplateId ?? ''}
          onChange={(e) => updateSettings({ defaultTemplateId: e.target.value || null })}
          disabled={templates.length === 0}
          className="rounded-xl px-3 py-2 text-sm outline-none min-w-[160px]"
          style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}
        >
          {templates.length === 0 ? (
            <option value="">{t.templates.empty}</option>
          ) : (
            templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))
          )}
        </select>
      </Row>

      <Row label={t.settings.notifications}>
        <button
          onClick={() => updateSettings({ notifications: !settings.notifications })}
          className="w-12 h-7 rounded-full relative transition-colors"
          style={{ background: settings.notifications ? 'var(--accent)' : 'var(--bg-sunken)', border: '1px solid var(--border)' }}
          aria-pressed={settings.notifications}
        >
          <span
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
            style={{ [settings.notifications ? 'insetInlineEnd' : 'insetInlineStart']: '3px' } as React.CSSProperties}
          />
        </button>
      </Row>

      <button
        onClick={() => onNavigate('myInfo')}
        className="text-start rounded-2xl p-4 text-sm font-medium"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
      >
        {t.nav.myInfo}
      </button>

      <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
        <p className="text-sm font-medium mb-3">{t.settings.privacyTitle}</p>
        <button
          onClick={() => onNavigate('privacy')}
          className="w-full text-start text-sm mb-3"
          style={{ color: 'var(--fg-muted)' }}
        >
          {t.privacy.title} →
        </button>
        <button
          onClick={() => setConfirmOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold"
          style={{ background: '#fde0de', color: '#a8261d' }}
        >
          <Trash2 size={15} /> {t.settings.deleteAll}
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={t.settings.deleteConfirmTitle}
        body={t.settings.deleteConfirmBody}
        confirmLabel={t.settings.confirm}
        cancelLabel={t.settings.cancel}
        danger
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          deleteAllData()
          showToast(t.toast.allDataDeleted)
          setConfirmOpen(false)
        }}
      />
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
      <span className="text-sm font-medium">{label}</span>
      {children}
    </div>
  )
}
