import { ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export function Privacy() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-6 max-w-lg">
      <header className="flex items-center gap-2">
        <ShieldCheck size={22} />
        <h1 className="font-display text-xl font-semibold">{t.privacy.title}</h1>
      </header>

      <ul className="flex flex-col gap-3">
        {t.privacy.points.map((point, i) => (
          <li
            key={i}
            className="rounded-2xl p-4 text-sm flex items-start gap-3"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: 'var(--accent)' }} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
