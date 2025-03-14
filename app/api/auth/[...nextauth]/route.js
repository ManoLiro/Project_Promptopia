import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import { connectToDatabase } from '@utils/database';
import User from '@models/user';


console.log(process.env.GOOGLE_ID, process.env.GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDatabase();

                //check if user already exists
                const UserExists = await User.findOne({ email: profile.email });
                if (!UserExists) {
                    //if not, create a new user
                    const uname = profile.name.replace(" ", "").toLowerCase().split(" ");
                    await User.create({
                        email: profile.email,
                        username: uname[0],
                        image: profile.picture
                    });
                }
                //if not, create a new user

                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };