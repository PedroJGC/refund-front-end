import { BrowserRouter } from 'react-router'

import { Loading } from '../components/Loading'

import { useAuth } from '../hooks/useAuth'

import { AuthRoutes } from './AuthRoutes'
import { EmployeeRoutes } from './EmployeeRoutes'
import { ManagerRoutes } from './ManagerRoutes'

const isLoading = false

export function Routes() {
  const { session } = useAuth()

  function Route() {
    switch (session?.user.role) {
      case 'employee':
        return <EmployeeRoutes />
      case 'manager':
        return <ManagerRoutes />
      default:
        return <AuthRoutes />
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  )
}
