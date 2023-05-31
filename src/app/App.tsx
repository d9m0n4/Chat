import './index.css'
import React, { useEffect, useState } from 'react'
import { Sidebar } from 'widgets/Sidebar'

export enum Theme {
  DEFAULT = 'default',
  DARK = 'dark',
}

const defaultTheme = Theme.DEFAULT

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || defaultTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  console.log(theme)

  return (
    <div className="app">
      <Sidebar />
    </div>
  )
}

export default App
