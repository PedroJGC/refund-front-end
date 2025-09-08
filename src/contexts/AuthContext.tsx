import { createContext } from 'react'

export const AuthContext = createContext({})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider
      value={{ name: 'John Doe', email: 'l2v4d@example.com' }}
    >
      {children}
    </AuthContext.Provider>
  )
}
