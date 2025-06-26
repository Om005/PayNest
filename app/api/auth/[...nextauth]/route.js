import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDB";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      if (account.provider == "google") {
        const email = profile.email;
        await connectDb();
        const curruser = await User.findOne({ email: email });

        if (!curruser) {
          const newUser = new User({
            email: email,
            name: profile.name,
            username: email.split("@")[0],
            friends: [],
          });
          await newUser.save();
          // user.name = newUser.username
        } else {
          // user.name = curruser.username;
        }
        return true;
      }
    },
    async session({ session, user, token }) {
      const dbuser = await User.findOne({ email: session.user.email });
      session.user.name = dbuser.name;
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };
