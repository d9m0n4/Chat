import { routerConfig } from '../config/routerConfig'
import { AppRoutes } from '../config/types'
import { Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from 'widgets/Layout/Layout'

export const AppRouter = () => {
  return (
    <Routes>
      {Object.values(routerConfig).map((route) => (
        <Route key={route.path} path="/" element={<Layout path={route.path} />}>
          <Route path={route.path} element={route.element} />
        </Route>
      ))}
    </Routes>
  )
}
