
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// IMPORTANT: In a production environment, you should store these values in
// environment variables. For example, `process.env.GOOGLE_CLIENT_ID`.
const GOOGLE_CLIENT_ID = "1049487512117-vncvjl28q7sfg4g69bc88h4g231d5269.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

// IMPORTANT: In a production environment, you should store this value in
// an environment variable. You can generate a new secret with `openssl rand -base64 32`.
const NEXTAUTH_SECRET = "YOUR_VERY_SECRET_KEY_HERE"; // Replace with a real secret

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }
