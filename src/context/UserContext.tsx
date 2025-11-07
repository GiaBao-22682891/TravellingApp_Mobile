import { createContext, useState, useContext, type ReactNode } from "react"
import type { User } from "../type/type"

interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const logout = () => {
    setCurrentUser(null)
  }

  return <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
