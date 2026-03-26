import type { NextAuthConfig } from 'next-auth'

// Edge-safe auth config (no Node.js-only imports)
export const authConfig: NextAuthConfig = {
  providers: [],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
  },
}
