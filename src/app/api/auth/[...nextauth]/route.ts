import { IUser } from "@/models/UserModel"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const authOption: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                otp: { label: "OTP", type: "text" },
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (credentials?.otp) {
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
                }
                else {
                    const res = await fetch(`${process.env.API_URI}/api/v1/auth/signin`, {
                        cache: 'no-cache',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password
                        })
                    })

                    const data = await res.json()
                    if (!res.ok) throw new Error(data.message)
                    return data
                }
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