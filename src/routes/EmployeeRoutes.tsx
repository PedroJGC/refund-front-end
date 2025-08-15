import { Route, Routes } from 'react-router'
import { NotFound } from '../pages/NotFound'
import { Refund } from '../pages/Refund'

export function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Refund />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
