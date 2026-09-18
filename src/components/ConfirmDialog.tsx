import { useLanguage } from '../context/LanguageContext'

interface ConfirmDialogProps {
  open: boolean
  title: string
  body: string
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  danger?: boolean
}

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  danger,
}: ConfirmDialogProps) {
  const { t } = useLanguage()
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-5 shadow-2xl"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>
          {body}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors"
            style={{ background: 'var(--bg-sunken)', color: 'var(--fg)' }}
          >
            {cancelLabel ?? t.common.cancel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-transform active:scale-95"
            style={
              danger
                ? { background: '#e5342b', color: '#fff' }
                : { background: 'var(--accent)', color: 'var(--accent-ink)' }
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
