import 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string
    name: string
    email: string
    image?: string
    description?: string
    createdAt: Date
    updatedAt: Date
  }
  interface Session {
    user: User
  }
}
