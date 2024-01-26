import React from 'react'
import { routes } from './routes'
import { Route, Routes } from 'react-router-dom'

function AppRouter() {
  return (
    <Routes>
      {routes.map(({ path, Component }) => {
        return <Route path={path} element={<Component />} key={path} />
      })}
    </Routes>
  )
}

export default AppRouter
