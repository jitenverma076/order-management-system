import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/auth'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        return {
          id: "1",
          email: credentials.email,
          name: "Test User",
          role: "USER"
        }
      }
    })
  ],
  callbacks: {
    async redirect() {
      return "/dashboard"
    }
  }
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
