import { useEffect, useState } from 'react'
import { AppDataProvider, useAppData } from './context/AppDataContext'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { storage } from './services/storage'
import { Sidebar, BottomNav, type Route } from './components/Navigation'
import { LanguageSwitcher, ThemeSwitcher } from './components/Switchers'
import { Dashboard } from './pages/Dashboard'
import { Recovery } from './pages/Recovery'
import { Templates } from './pages/Templates'
import { History } from './pages/History'
import { MyInformation } from './pages/MyInformation'
import { SettingsPage } from './pages/Settings'
import { Privacy } from './pages/Privacy'
import { Preview } from './pages/Preview'
import type { RecoveryRequest } from './types'

function Shell() {
  const [route, setRoute] = useState<Route>('dashboard')
  const [previewRequest, setPreviewRequest] = useState<RecoveryRequest | null>(null)
  const [prefillFriend, setPrefillFriend] = useState<string>('')
  const [prefillTemplateId, setPrefillTemplateId] = useState<string>('')
  const { templates, addRequest, profile } = useAppData()

  const navigate = (r: Route) => {
    setPreviewRequest(null)
    if (r !== 'recovery') {
      setPrefillFriend('')
      setPrefillTemplateId('')
    }
    setRoute(r)
  }

  const startRecovery = (friendUsername: string, templateId: string) => {
    const tpl = templates.find((t) => t.id === templateId)
    if (!tpl || !profile) return
    const req = addRequest({
      username: tpl.username,
      email: tpl.email,
      phone: tpl.phone,
      chatType: tpl.chatType,
      friendUsername,
      templateId: tpl.id,
      templateName: tpl.name,
    })
    setPreviewRequest(req)
  }

  const reuseRequest = (r: RecoveryRequest) => {
    setPreviewRequest(null)
    setPrefillFriend(r.friendUsername)
    setPrefillTemplateId(r.templateId)
    setRoute('recovery')
  }

  const useTemplate = (templateId: string) => {
    setPrefillFriend('')
    setPrefillTemplateId(templateId)
    setRoute('recovery')
  }

  let page: React.ReactNode
  if (previewRequest) {
    page = (
      <Preview
        request={previewRequest}
        onBack={() => setPreviewRequest(null)}
        onSaved={() => {
          setPreviewRequest(null)
          setRoute('history')
        }}
      />
    )
  } else {
    switch (route) {
      case 'dashboard':
        page = <Dashboard onNavigate={navigate} onStartRecovery={startRecovery} />
        break
      case 'recovery':
        page = (
          <Recovery
            onNavigate={navigate}
            onStartRecovery={startRecovery}
            initialFriendUsername={prefillFriend}
            initialTemplateId={prefillTemplateId}
          />
        )
        break
      case 'templates':
        page = <Templates onUseTemplate={useTemplate} />
        break
      case 'history':
        page = (
          <History
            onOpenRequest={(r) => setPreviewRequest(r)}
            onReuse={reuseRequest}
          />
        )
        break
      case 'myInfo':
        page = <MyInformation />
        break
      case 'settings':
        page = <SettingsPage onNavigate={navigate} />
        break
      case 'privacy':
        page = <Privacy />
        break
      default:
        page = <Dashboard onNavigate={navigate} onStartRecovery={startRecovery} />
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Sidebar route={route} onNavigate={navigate} />
      <div className="flex-1 flex flex-col">
        <header className="hidden md:flex items-center justify-end gap-3 px-8 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </header>
        <main className="flex-1 px-4 md:px-8 py-5 md:py-6">{page}</main>
      </div>
      <BottomNav route={route} onNavigate={navigate} />
    </div>
  )
}

export default function App() {
  const [settings, setSettings] = useState(() => storage.getSettings())

  useEffect(() => {
    // keep manifest theme-color in sync with mode changes for the PWA status bar
  }, [])

  return (
    <AppDataProvider>
      <LanguageProvider
        initial={settings.language}
        onChange={(language) => {
          const next = { ...settings, language }
          setSettings(next)
          storage.saveSettings(next)
        }}
      >
        <ThemeProvider
          initial={settings.theme}
          onChange={(theme) => {
            const next = { ...settings, theme }
            setSettings(next)
            storage.saveSettings(next)
          }}
        >
          <ToastProvider>
            <Shell />
          </ToastProvider>
        </ThemeProvider>
      </LanguageProvider>
    </AppDataProvider>
  )
}
