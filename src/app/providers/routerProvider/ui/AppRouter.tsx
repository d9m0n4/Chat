import {Suspense} from 'react'
import {routerConfig} from '../config/routerConfig'
import {Route, Routes} from 'react-router-dom'
import {Layout} from 'widgets/Layout/Layout'
import {RequireAuth} from "./RequireAuth";

export const AppRouter = () => {
   return (
    <Routes>
      {Object.values(routerConfig).map((route) => {
        const element = (<Suspense>{route.element}</Suspense>)
        if (route.authOnly) {
          return <Route key={route.path} element={<Layout path={route.path} />}>
            <Route path={route.path} element={<RequireAuth>{element}</RequireAuth>} />
          </Route>
        }
        return <Route path={route.path} element={route.element} />
      })}
    </Routes>
  )
}
