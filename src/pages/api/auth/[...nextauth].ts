import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "../../../env/server.mjs";
import { cloneDeep } from "tailwindcss/lib/util/cloneDeep";

export const authOptions: NextAuthOptions = {
  // TODO: Include user.id on session
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token["userProfile"] = {
          id: profile.id,
          discriminator: profile.discriminator,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const userData = cloneDeep(token.userProfile);
      session.user.id = userData.id;
      session.user.discriminator = userData.discriminator;
      return session;
    },
  },
};

export default NextAuth(authOptions);
