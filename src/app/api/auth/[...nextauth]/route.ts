import { IUser } from "@/models/UserModel"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

export const authOption: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials, req) {
                const email = cookies().get('email')?.value
                const res = await fetch(`${process.env.API_URI}/api/v1/auth/otp-verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        otpCode: credentials?.otp
                    })
                })
                const data: IUser | any = await res.json()
                if (!res.ok) throw new Error(data.message)
                return data
            },
        })
    ],
    callbacks: {
        async signIn() {
            cookies().delete('email')
            return true
        },
        async jwt({ token, user, account }) {
            if (account) {
                token.user = user as IUser
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/otp',
    }
}
const handler = NextAuth(authOption)

export { handler as GET, handler as POST }