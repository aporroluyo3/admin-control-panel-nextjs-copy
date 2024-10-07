import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { AUTH_ROUTES } from '@/constants/route.constants';
import { getAuthCredentials } from '@/features/auth/services/auth.services';
import { JwtCompletePayload } from '@/features/auth/types/auth.types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const authOptions: NextAuthOptions = {
  pages: {
    signIn: AUTH_ROUTES.login,
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const response = await getAuthCredentials({
            email,
            password,
          });

          const decoded: JwtCompletePayload = jwtDecode(response.token);

          if (!decoded.sub) return null;

          return {
            id: decoded.sub,
            name: response.username,
            email,
            token: response.token,
            role: decoded.role,
          };
        } catch (error: any) {
          if (error.response?.status === 400) {
            return { error: 401 };
          }
          return { error: 500 };
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      if (user?.error === 500) {
        throw new Error('Internal Server Error');
      }
      if (user?.error === 401) {
        throw new Error('Unauthorized');
      }
      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export { authOptions };
