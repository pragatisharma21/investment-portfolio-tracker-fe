import { del, get, set } from 'idb-keyval'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    callSetFunction()
  }, [])

  const callSetFunction = async () => {
    const token = await get('token')
    const userId = await get('userId')

    if (token && userId) {
      setUser({ token, id: userId })
    }
  }

  const login = async (token, id) => {
    await set('token', token)
    await set('userId', id)
    setUser({ token, id })
  }

  const logout = async () => {
    await del('token')
    await del('userId')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
