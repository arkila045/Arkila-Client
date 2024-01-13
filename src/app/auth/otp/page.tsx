import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import OtpForm from './otpForm'

export const metadata: Metadata = {
    title: 'OTP'
}

export default function page() {
    return (
        <main className="bg-main min-h-screen bg-cover py-52 font-">
            <div className="flex justify-between container mx-auto">
                <div className='flex flex-col lg:flex-row gap-5 justify-between items-center lg:items-start w-full'>
                    <h1 className="h-fit text-5xl  px-4 border-l-[20px] border-primary text-white font-medium sapce leading-relaxed">
                        Rent <span className="text-primary">anything</span> <br /> from people in your <br /> area
                    </h1>
                    <OtpForm />
                </div>
            </div>
        </main>
    )
}
