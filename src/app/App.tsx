import { AppRouter } from './providers/routerProvider'
import './styles/index.scss'
import { Theme } from 'features/ChangeTheme/ui/ThemeCard'
import { useEffect } from 'react'
import { Sidebar } from 'widgets/Sidebar'

const defaultTheme = Theme.DEFAULT

function App() {
  const theme = localStorage.getItem('theme') || defaultTheme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  return (
    <div className="app">
      <div className="main">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  )
}

export default App
