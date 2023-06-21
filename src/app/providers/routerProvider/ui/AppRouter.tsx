import { routerConfig } from '../config/routerConfig'
import { AppRoutes } from '../config/types'
import { Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
  return (
    <Routes>
      {Object.values(routerConfig).map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}
