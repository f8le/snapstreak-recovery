import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAppData } from '../context/AppDataContext'
import { useToast } from '../context/ToastContext'
import { TemplateCard } from '../components/TemplateCard'
import { TemplateForm } from '../components/TemplateForm'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { FlameIcon } from '../components/FlameIcon'
import type { RecoveryTemplate } from '../types'

interface TemplatesProps {
  onUseTemplate: (templateId: string) => void
}

export function Templates({ onUseTemplate }: TemplatesProps) {
  const { t } = useLanguage()
  const { templates, addTemplate, updateTemplate, deleteTemplate, duplicateTemplate, setDefaultTemplate } = useAppData()
  const { showToast } = useToast()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<RecoveryTemplate | null>(null)
  const [pendingDelete, setPendingDelete] = useState<RecoveryTemplate | null>(null)

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (tpl: RecoveryTemplate) => {
    setEditing(tpl)
    setFormOpen(true)
  }

  const handleSubmit = (data: { name: string; username: string; email: string; phone: string; chatType: RecoveryTemplate['chatType'] }) => {
    if (editing) {
      updateTemplate(editing.id, data)
      showToast(t.toast.templateUpdated)
    } else {
      addTemplate(data)
      showToast(t.toast.templateSaved)
    }
    setFormOpen(false)
  }

  return (
    <div className="flex flex-col gap-6 pb-24 md:pb-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold mb-1">{t.templates.title}</h1>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{t.templates.subtitle}</p>
        </div>
        <button
          onClick={openCreate}
          className="shrink-0 flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform active:scale-95"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          <Plus size={16} /> {t.templates.create}
        </button>
      </header>

      {templates.length === 0 ? (
        <div className="rounded-3xl p-8 text-center flex flex-col items-center gap-3" style={{ background: 'var(--bg-sunken)', border: '1px dashed var(--border)' }}>
          <FlameIcon className="w-8 h-8" />
          <h3 className="font-display font-semibold">{t.templates.empty}</h3>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{t.templates.emptyBody}</p>
          <button
            onClick={openCreate}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {t.templates.create}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {templates.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              onUse={() => onUseTemplate(tpl.id)}
              onEdit={() => openEdit(tpl)}
              onDuplicate={() => {
                duplicateTemplate(tpl.id)
                showToast(t.toast.templateDuplicated)
              }}
              onDelete={() => setPendingDelete(tpl)}
              onSetDefault={() => {
                setDefaultTemplate(tpl.id)
                showToast(t.toast.defaultSet)
              }}
            />
          ))}
        </div>
      )}

      <TemplateForm open={formOpen} initial={editing} onClose={() => setFormOpen(false)} onSubmit={handleSubmit} />

      <ConfirmDialog
        open={!!pendingDelete}
        title={t.templates.delete}
        body={pendingDelete?.name ?? ''}
        confirmLabel={t.templates.delete}
        cancelLabel={t.common.cancel}
        danger
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteTemplate(pendingDelete.id)
            showToast(t.toast.templateDeleted)
          }
          setPendingDelete(null)
        }}
      />
    </div>
  )
}
