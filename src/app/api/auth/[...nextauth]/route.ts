import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        access_token: { type: "text" },
        refresh_token: { type: "text" },
        user: { type: "text" },
      },
      authorize: async (credentials, _req) => {
        try {
          console.log("CREDS", credentials);

          if (
            !credentials?.access_token ||
            !credentials?.refresh_token ||
            !credentials.user
          ) {
            return null;
          }

          const { access_token, refresh_token, user } = credentials;

          const sessionedUser = JSON.parse(user);

          return {
            name: sessionedUser.name,
            email: sessionedUser.email,
            role: sessionedUser.role,
            profile: sessionedUser.profile,
            accessToken: access_token,
            refreshToken: refresh_token,
          } as any;
        } catch (error: any) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({
      token,
      user,
      // account,
    }: {
      token: any;
      user: any;
      // account: any;
    }) {
      // console.log("ACC", account, user);

      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.profile = user.profile;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          role: token.role,
          profile: token.profile,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
