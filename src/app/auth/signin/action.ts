'use server'
import z from 'zod'
import { ISignInState } from './signInForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const signInSchema = z.object({
    username: z.string().min(1, { message: 'Username or email is required.' }),
    password: z.string().min(1, { message: 'Password is required' })
})
export const signIn = async (prevState: any, formData: FormData) => {
    const result: ISignInState = {
        success: false,
        message: null,
        password: null,
        username: null
    }
    try {
        const signInClean = signInSchema.parse({
            username: formData.get('username'),
            password: formData.get('password')
        })

        const res = await fetch(`${process.env.API_URI}/api/v1/auth/signin`, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: signInClean.username,
                password: signInClean.password
            })
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        cookies().set({
            name: 'email',
            value: data.data.email,
            secure: true
        })
    } catch (e) {
        if (e instanceof z.ZodError) {
            e.errors.map((value, index) => {
                const indexResult = value.path[0].toString()
                if (!result[indexResult]) {
                    result[indexResult] = value.message
                }
            })
        }

        if (e instanceof Error) {
            result.message = e.message
        }
        return result
    }


    redirect('/auth/otp')
}