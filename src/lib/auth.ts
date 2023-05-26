import { NextAuthOptions } from "next-auth";
import prisma from '@/lib/prisma'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import GoogleProvider from "next-auth/providers/google";

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if(!clientId ||clientId.length ===0) {
        throw new Error('No clientId or google provider set')
    }
    if(!clientSecret ||clientSecret.length ===0) {
        throw new Error('No clientSecret or google provider set')
    }

    return {clientId,clientSecret}
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
          }),
    ],
    callbacks: {
        async session({token, session}){
            if(token){
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.picture = token.picture
            }

            return session
        },
        async jwt({token,user}){
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token.email,
                }
            })

            if(!dbUser){
                token.id = user!.id
                return token 
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.picture
            }
        },
        // after user login, redirect to dashboard
        redirect(){
            return '/dashboard'
        }
    }
}