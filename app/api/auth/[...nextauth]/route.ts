import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

import User from "@models/user";
import { connectToDB } from "@utils/database";

// Lambda fns (serverless fns) will trigger the server just when they get called, so the server wont be
// running constantly. After which the server stops running until the next event or request triggers it. 
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async session({ session }: { session: any}) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
  
      session.user.id = sessionUser._id.toString();
  
      return session;
    },
    async signIn({user, profile}) {
      try {
        await connectToDB();
  
        // Check if a user already exist
        const userExists = await User.findOne({
          email: profile?.email
        });
  
        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ","").toLowerCase(),
            image: user?.image
          })
        }
        return true;
      } catch (error) {
        console.error();
        return false;
      }
    }
  },
})

export { handler as GET, handler as POST };