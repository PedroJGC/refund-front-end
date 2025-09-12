import { createContext, type ReactNode, useState } from 'react'

type AuthContext = {
  session: null | UserAPIResponse
  save: (data: UserAPIResponse) => void
}

const LOCAL_STORAGE_KEY = '@refund'

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null)

  function save(data: UserAPIResponse) {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data))
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)
    setSession(data)
  }

  return (
    <AuthContext.Provider value={{ session, save }}>
      {children}
    </AuthContext.Provider>
  )
}
