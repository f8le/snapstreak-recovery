import { Check, Copy, Pencil, Star, Trash2 } from 'lucide-react'
import type { RecoveryTemplate } from '../types'
import { useLanguage } from '../context/LanguageContext'
import { FlameIcon } from './FlameIcon'

interface TemplateCardProps {
  template: RecoveryTemplate
  onUse: () => void
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  onSetDefault: () => void
}

export function TemplateCard({
  template,
  onUse,
  onEdit,
  onDuplicate,
  onDelete,
  onSetDefault,
}: TemplateCardProps) {
  const { t } = useLanguage()
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3"
      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{ background: 'var(--bg-sunken)' }}
          >
            <FlameIcon className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{template.name}</p>
            <p className="text-xs truncate" style={{ color: 'var(--fg-muted)' }}>
              @{template.username}
            </p>
          </div>
        </div>
        {template.isDefault && (
          <span
            className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full shrink-0"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            <Star size={11} fill="currentColor" />
            {t.templates.isDefault}
          </span>
        )}
      </div>

      <dl className="text-xs grid grid-cols-1 gap-1" style={{ color: 'var(--fg-muted)' }}>
        <div className="flex justify-between gap-2">
          <dt>{t.myInfo.email}</dt>
          <dd className="truncate">{template.email}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>{t.myInfo.phone}</dt>
          <dd className="truncate">{template.phone}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>{t.myInfo.chatType}</dt>
          <dd className="truncate">{t.chatTypes[template.chatType]}</dd>
        </div>
      </dl>

      <button
        onClick={onUse}
        className="w-full rounded-xl py-2 text-sm font-semibold transition-transform active:scale-95"
        style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
      >
        {t.templates.use}
      </button>

      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--fg-muted)' }}>
        <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg" style={{ background: 'var(--bg-sunken)' }}>
          <Pencil size={13} /> {t.templates.edit}
        </button>
        <button onClick={onDuplicate} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg" style={{ background: 'var(--bg-sunken)' }}>
          <Copy size={13} /> {t.templates.duplicate}
        </button>
        {!template.isDefault && (
          <button onClick={onSetDefault} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg" style={{ background: 'var(--bg-sunken)' }}>
            <Check size={13} /> {t.templates.setDefault}
          </button>
        )}
        <button onClick={onDelete} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg" style={{ background: 'var(--bg-sunken)', color: '#e5342b' }}>
          <Trash2 size={13} /> {t.templates.delete}
        </button>
      </div>
    </div>
  )
}
