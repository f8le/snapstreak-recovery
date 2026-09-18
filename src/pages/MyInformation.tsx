import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAppData } from '../context/AppDataContext'
import { useToast } from '../context/ToastContext'
import type { ChatType } from '../types'
import { isValidEmail, isValidPhone, cleanUsername } from '../utils/validation'

export function MyInformation() {
  const { t } = useLanguage()
  const { profile, saveProfile } = useAppData()
  const { showToast } = useToast()

  const [username, setUsername] = useState(profile?.username ?? '')
  const [email, setEmail] = useState(profile?.email ?? '')
  const [phone, setPhone] = useState(profile?.phone ?? '')
  const [chatType, setChatType] = useState<ChatType>(profile?.chatType ?? 'friend')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSave = () => {
    const errs: Record<string, string> = {}
    if (!username.trim()) errs.username = t.errors.required
    if (!email.trim()) errs.email = t.errors.required
    else if (!isValidEmail(email)) errs.email = t.errors.invalidEmail
    if (!phone.trim()) errs.phone = t.errors.required
    else if (!isValidPhone(phone)) errs.phone = t.errors.invalidPhone
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    saveProfile({ username: cleanUsername(username), email: email.trim(), phone: phone.trim(), chatType })
    showToast(t.toast.profileSaved)
  }

  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-6 max-w-lg">
      <header>
        <h1 className="font-display text-xl font-semibold mb-1">{t.myInfo.title}</h1>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{t.myInfo.subtitle}</p>
      </header>

      <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
        <Field label={t.myInfo.username} value={username} onChange={setUsername} error={errors.username} placeholder="my_username" prefix="@" />
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

        <button
          onClick={handleSave}
          className="w-full rounded-xl py-3 font-semibold transition-transform active:scale-95"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          {t.myInfo.save}
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
  prefix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  type?: string
  prefix?: string
}) {
  return (
    <div>
      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--fg-muted)' }}>
        {label}
      </label>
      <div className="flex items-center rounded-xl px-3" style={{ background: 'var(--bg-sunken)', border: `1px solid ${error ? '#e5342b' : 'var(--border)'}` }}>
        {prefix && <span className="text-sm select-none me-0.5" style={{ color: 'var(--fg-muted)' }}>{prefix}</span>}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-2.5 text-sm outline-none"
        />
      </div>
      {error && <p className="text-xs mt-1" style={{ color: '#e5342b' }}>{error}</p>}
    </div>
  )
}

export { Field }
