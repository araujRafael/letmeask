import { ReactNode } from "react"

export type UserType = {
  id: string,
  name: string,
  avatar: string
}
export type AuthContextType = {
  User: UserType | undefined;
  signInWithGoogle: () => Promise<void>
}
export type AuthContextProviderProps = {
  children: ReactNode;
}