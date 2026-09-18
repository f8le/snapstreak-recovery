import { useState } from 'react'
import { X } from 'lucide-react'
import type { ChatType, RecoveryTemplate } from '../types'
import { useLanguage } from '../context/LanguageContext'
import { isValidEmail, isValidPhone, cleanUsername } from '../utils/validation'

interface TemplateFormProps {
  open: boolean
  initial?: RecoveryTemplate | null
  onClose: () => void
  onSubmit: (data: {
    name: string
    username: string
    email: string
    phone: string
    chatType: ChatType
  }) => void
}

export function TemplateForm({ open, initial, onClose, onSubmit }: TemplateFormProps) {
  const { t } = useLanguage()
  const [name, setName] = useState(initial?.name ?? '')
  const [username, setUsername] = useState(initial?.username ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [phone, setPhone] = useState(initial?.phone ?? '')
  const [chatType, setChatType] = useState<ChatType>(initial?.chatType ?? 'friend')
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!open) return null

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = t.errors.templateNameRequired
    if (!username.trim()) errs.username = t.errors.required
    if (!email.trim()) errs.email = t.errors.required
    else if (!isValidEmail(email)) errs.email = t.errors.invalidEmail
    if (!phone.trim()) errs.phone = t.errors.required
    else if (!isValidPhone(phone)) errs.phone = t.errors.invalidPhone
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit({ name: name.trim(), username: cleanUsername(username), email: email.trim(), phone: phone.trim(), chatType })
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-thin"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold">
            {initial ? t.templates.editTitle : t.templates.newTitle}
          </h3>
          <button onClick={onClose} aria-label={t.common.close} className="p-1 rounded-lg" style={{ color: 'var(--fg-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Field label={t.templates.name} value={name} onChange={setName} error={errors.name} />
          <Field label={t.myInfo.username} value={username} onChange={setUsername} error={errors.username} placeholder="my_username" />
          <Field label={t.myInfo.email} value={email} onChange={setEmail} error={errors.email} placeholder="example@email.com" type="email" />
          <Field label={t.myInfo.phone} value={phone} onChange={setPhone} error={errors.phone} placeholder="+966xxxxxxxxx" />

          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--fg-muted)' }}>
              {t.myInfo.chatType}
            </label>
            <select
              value={chatType}
              onChange={(e) => setChatType(e.target.value as ChatType)}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}
            >
              {(['friend', 'best_friend', 'group', 'other'] as ChatType[]).map((c) => (
                <option key={c} value={c}>
                  {t.chatTypes[c]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-5 rounded-xl py-2.5 text-sm font-semibold transition-transform active:scale-95"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          {t.templates.save}
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--fg-muted)' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
        style={{ background: 'var(--bg-sunken)', border: `1px solid ${error ? '#e5342b' : 'var(--border)'}` }}
      />
      {error && <p className="text-xs mt-1" style={{ color: '#e5342b' }}>{error}</p>}
    </div>
  )
}
