'use client'
import InputBox from "@/components/inputBox"
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
// import { signIn } from "./action"
import { IState } from "@/types/initialStateType"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

export interface ISignInState extends IState {
    username?: string | null,
    password?: string | null
}

const initialState: ISignInState = {
    success: false,
    message: null,
}

const signInSchema = z.object({
    username: z.string().min(1, { message: 'Username or email is required.' }),
    password: z.string().min(1, { message: 'Password is required' })
})

const SignInButton = () => {
    const { pending } = useFormStatus()

    return (
        <button
            disabled={pending}
            className='py-3 bg-primary text-white w-full font-medium text-xl rounded-xl mt-2 hover:bg-red-800'>
            {pending ? 'Loading' : 'Sign in'}
        </button>
    )
}

export default function SignInForm() {
    // const [status, signInAction] = useFormState(signIn, initialState)
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | any>('')
    return (
        <form action={async (formData: FormData) => {
            try {
                const signInClean = await signInSchema.parse({
                    username: formData.get('username'),
                    password: formData.get('password')
                })

                const signInStatus = await signIn('credentials', {
                    username: signInClean.username,
                    password: signInClean.password,
                    callbackUrl: '/',
                    redirect: false
                })

                if (signInStatus?.ok) {
                    router.replace('/')
                }
                else {
                    setErrorMessage(signInStatus?.error)
                }

            } catch (e) {
                if (e instanceof z.ZodError) {
                    setErrorMessage(e.errors[0].message)
                }
                else if (e instanceof Error) {
                    setErrorMessage(e.message)
                }
            }

        }} className="p-8 bg-white rounded-3xl h-fit w-full max-w-lg">
            <h1 className="font-medium text-[55px]">Sign in</h1>
            <button
                type="button"
                className="mt-14 font-medium py-4 bg-[#E9F1FF] text-main-blue flex items-center justify-center gap-6 rounded-xl w-full">
                <FcGoogle size={26} />Sign in with Google
            </button>

            <div className="flex flex-col gap-8 mt-8">
                <InputBox
                    id="username"
                    label="Enter your username or email address"
                    placeholder="Username or email address"
                    type="text"
                />

                <InputBox
                    id="password"
                    label="Enter your Password"
                    placeholder="Password"
                    type="password"
                />
            </div>

            <div className='flex justify-end'>
                <button
                    type="button"
                    className='text-main-blue mt-4 text-[13px]'>
                    Forgot Password
                </button>
            </div>

            <div className="mt-[52px] text-xs text-red-600">{errorMessage}</div>
            <SignInButton />
            <div className='mt-4 text-[13px] text-center'>
                No Account ?  <Link href={'/auth/signup'} className='text-main-blue'>Sign up</Link>
            </div>
        </form>
    )
}
