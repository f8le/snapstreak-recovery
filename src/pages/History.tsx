import { useMemo, useState } from 'react'
import { Copy, ExternalLink, RotateCcw, Search, Trash2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAppData } from '../context/AppDataContext'
import { useToast } from '../context/ToastContext'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { FlameIcon } from '../components/FlameIcon'
import type { RecoveryRequest, RequestStatus } from '../types'

const SNAPCHAT_SUPPORT_URL = 'https://help.snapchat.com/hc/en-us/requests/new?ticket_form_id=5312744042260'

interface HistoryProps {
  onOpenRequest: (request: RecoveryRequest) => void
  onReuse: (request: RecoveryRequest) => void
}

const FILTERS: (RequestStatus | 'all')[] = ['all', 'pending', 'submitted', 'recovered', 'failed']

export function History({ onOpenRequest, onReuse }: HistoryProps) {
  const { t } = useLanguage()
  const { requests, deleteRequest, updateRequestStatus } = useAppData()
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<RequestStatus | 'all'>('all')
  const [pendingDelete, setPendingDelete] = useState<RecoveryRequest | null>(null)

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchesQuery =
        !query.trim() ||
        r.friendUsername.toLowerCase().includes(query.trim().toLowerCase()) ||
        r.username.toLowerCase().includes(query.trim().toLowerCase())
      const matchesFilter = filter === 'all' || r.status === filter
      return matchesQuery && matchesFilter
    })
  }, [requests, query, filter])

  const handleCopy = async (r: RecoveryRequest) => {
    const text = [
      `Username:\n${r.username}`,
      `Email:\n${r.email}`,
      `Phone:\n${r.phone}`,
      `Chat Type:\n${t.chatTypes[r.chatType]}`,
      `Friend Username:\n${r.friendUsername}`,
    ].join('\n\n')
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* clipboard unavailable */
    }
    showToast(t.toast.dataCopied)
  }

  return (
    <div className="flex flex-col gap-5 pb-24 md:pb-6">
      <header>
        <h1 className="font-display text-xl font-semibold mb-1">{t.history.title}</h1>
      </header>

      <div className="flex items-center rounded-xl px-3 py-2.5" style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}>
        <Search size={16} style={{ color: 'var(--fg-muted)' }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.history.search}
          className="bg-transparent outline-none flex-1 text-sm ms-2"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors"
            style={
              filter === f
                ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
                : { background: 'var(--bg-sunken)', color: 'var(--fg-muted)' }
            }
          >
            {f === 'all' ? t.history.all : t.status[f]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl p-8 text-center flex flex-col items-center gap-2" style={{ background: 'var(--bg-sunken)' }}>
          <FlameIcon className="w-7 h-7" />
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{t.history.empty}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full shrink-0" style={{ background: 'var(--bg-sunken)' }}>
                    <FlameIcon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">@{r.friendUsername}</p>
                    <p className="text-xs truncate" style={{ color: 'var(--fg-muted)' }}>{r.templateName}</p>
                  </div>
                </div>
                <select
                  value={r.status}
                  onChange={(e) => updateRequestStatus(r.id, e.target.value as RequestStatus)}
                  className="text-[11px] font-semibold rounded-full px-2 py-1 outline-none border-0"
                  style={{ background: 'var(--bg-sunken)' }}
                >
                  {(['pending', 'submitted', 'recovered', 'failed'] as RequestStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {t.status[s]}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-xs mb-3" style={{ color: 'var(--fg-muted)' }}>
                {new Date(r.createdAt).toLocaleString()}
              </p>

              <div className="flex items-center gap-1.5 text-xs">
                <button onClick={() => onOpenRequest(r)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg" style={{ background: 'var(--bg-sunken)' }}>
                  {t.history.open}
                </button>
                <button onClick={() => handleCopy(r)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg" style={{ background: 'var(--bg-sunken)' }}>
                  <Copy size={13} /> {t.history.copy}
                </button>
                <button onClick={() => onReuse(r)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg" style={{ background: 'var(--bg-sunken)' }}>
                  <RotateCcw size={13} /> {t.history.reuse}
                </button>
                <button onClick={() => setPendingDelete(r)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg" style={{ background: 'var(--bg-sunken)', color: '#e5342b' }}>
                  <Trash2 size={13} /> {t.history.delete}
                </button>
              </div>
              <a
                href={SNAPCHAT_SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-1 text-[11px]"
                style={{ color: 'var(--fg-muted)' }}
              >
                <ExternalLink size={11} /> {t.preview.openSupport}
              </a>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title={t.history.delete}
        body={pendingDelete ? `@${pendingDelete.friendUsername}` : ''}
        confirmLabel={t.history.delete}
        cancelLabel={t.common.cancel}
        danger
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteRequest(pendingDelete.id)
            showToast(t.toast.requestDeleted)
          }
          setPendingDelete(null)
        }}
      />
    </div>
  )
}
