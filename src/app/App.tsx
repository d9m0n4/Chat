import './styles/index.scss'
import React, { useEffect, useState } from 'react'
import { Dialogs } from 'widgets/Dialogs'
import { Header } from 'widgets/Header'
import { Interlocutor } from 'widgets/Interlocutor'
import { Messages } from 'widgets/Messages'
import { Sidebar } from 'widgets/Sidebar'

export enum Theme {
  DEFAULT = 'default',
  DARK = 'dark',
}

const defaultTheme = Theme.DEFAULT

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || defaultTheme)
  const changeTheme = () => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.DEFAULT : Theme.DARK))
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="app">
      <button style={{ position: 'absolute', top: '50%', left: '50%' }} onClick={changeTheme}>
        CHANGE THEME
      </button>
      <div className="main">
        <Sidebar />
        <div style={{ width: '100%' }}>
          <Header />
          <div className="main-section">
            <div>
              <Dialogs />
            </div>
            <Messages />
            <Interlocutor />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
