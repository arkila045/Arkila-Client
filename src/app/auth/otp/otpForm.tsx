'use client'
import InputBox from "@/components/inputBox"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

export default function OtpForm() {
    const [pending, setPending] = useState<boolean>(false)
    return (
        <form
            action={async (formData: FormData) => {
                setPending(true)
                await signIn('credentials', {
                    otp: formData.get('otp'),
                    callbackUrl: '/'
                })
                setPending(false)
            }}
            className="p-8 bg-white rounded-3xl h-fit w-full max-w-lg">
            <h1 className="font-medium text-[55px]">Verification</h1>

            <div className='flex flex-col items-center justify-center mt-[30px] mb-[32px]'>
                <Image src={'/otp.png'} alt='otp' width={136} height={144} />
                <div className='text-center mt-6'>
                    <h2 className='font-bold text-main-black text-xl'>OTP Verification</h2>
                    <h3>Enter the OTP sent to <span className='text-main-black font-bold'>your email</span></h3>
                </div>
            </div>

            <InputBox
                id="otp"
                placeholder="Enter code"
                type="text"
            />

            <div className='flex mt-4 text-xs justify-center'>
                <label htmlFor="agree">
                    Didn’t you receive the OTP? <button className='text-main-blue'>Resend OTP</button>
                </label>
            </div>

            <button
                disabled={pending}
                type="submit"
                className='py-3 bg-primary text-white w-full font-medium text-xl rounded-xl mt-[52px] hover:bg-red-800'>
                {pending ? 'Loading' : 'Verify'}
            </button>
        </form>
    )
}
