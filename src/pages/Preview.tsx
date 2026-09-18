import { ArrowRight, Copy, ExternalLink, Save } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useToast } from '../context/ToastContext'
import type { RecoveryRequest } from '../types'
import { FlameIcon } from '../components/FlameIcon'

const SNAPCHAT_SUPPORT_URL = 'https://help.snapchat.com/hc/en-us/requests/new?ticket_form_id=5312744042260'

interface PreviewProps {
  request: RecoveryRequest
  onBack: () => void
  onSaved: () => void
}

export function Preview({ request, onBack, onSaved }: PreviewProps) {
  const { t } = useLanguage()
  const { showToast } = useToast()

  const rows: { label: string; value: string }[] = [
    { label: t.preview.username, value: request.username },
    { label: t.preview.email, value: request.email },
    { label: t.preview.phone, value: request.phone },
    { label: t.preview.chatType, value: t.chatTypes[request.chatType] },
    { label: t.preview.friendUsername, value: `@${request.friendUsername}` },
  ]

  const copyText = [
    `Username:\n${request.username}`,
    `Email:\n${request.email}`,
    `Phone:\n${request.phone}`,
    `Chat Type:\n${t.chatTypes[request.chatType]}`,
    `Friend Username:\n${request.friendUsername}`,
  ].join('\n\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
    } catch {
      // clipboard unavailable — fall back to a manual selection prompt would go here
    }
    showToast(t.toast.dataCopied)
  }

  const handleOpenSupport = () => {
    window.open(SNAPCHAT_SUPPORT_URL, '_blank', 'noopener,noreferrer')
  }

  const handleSave = () => {
    onSaved()
  }

  return (
    <div className="flex flex-col gap-5 pb-24 md:pb-6 max-w-lg">
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-medium w-fit" style={{ color: 'var(--fg-muted)' }}>
        <ArrowRight size={15} className="rtl:rotate-180" />
        {t.preview.back}
      </button>

      <div className="rounded-3xl overflow-hidden" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
        <div className="p-5" style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'var(--accent)' }}>
              <FlameIcon className="w-4 h-4" />
            </span>
            <h1 className="font-display text-lg font-semibold">{t.preview.title}</h1>
          </div>
          <p className="text-xs opacity-60">{t.preview.usedTemplate}: {request.templateName}</p>
        </div>

        <dl className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-5 py-3.5 gap-3">
              <dt className="text-xs shrink-0" style={{ color: 'var(--fg-muted)' }}>{row.label}</dt>
              <dd className="text-sm font-medium truncate text-end">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleCopy}
          className="w-full rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          <Copy size={16} /> {t.preview.copy}
        </button>
        <button
          onClick={handleOpenSupport}
          className="w-full rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95"
          style={{ background: 'var(--bg-sunken)', color: 'var(--fg)', border: '1px solid var(--border)' }}
        >
          <ExternalLink size={16} /> {t.preview.openSupport}
        </button>
        <button
          onClick={handleSave}
          className="w-full rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95"
          style={{ background: 'var(--bg-sunken)', color: 'var(--fg)', border: '1px solid var(--border)' }}
        >
          <Save size={16} /> {t.preview.saveRequest}
        </button>
      </div>

      <p className="text-xs text-center" style={{ color: 'var(--fg-muted)' }}>
        {t.privacy.points[4]}
      </p>
    </div>
  )
}
