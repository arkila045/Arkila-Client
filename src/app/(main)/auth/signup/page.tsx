import { Metadata } from 'next'
import SignUpForm from './signUpForm'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: 'Sign up'
}

export default function page() {
    return (
        <main className="bg-main min-h-screen bg-cover py-52 font-">
            <div className="flex justify-between container mx-auto">
                <div className='flex flex-col lg:flex-row gap-5 justify-between w-full'>
                    <h1 className="h-fit text-5xl  px-4 border-l-[20px] border-primary text-white font-medium sapce leading-relaxed">
                        Rent <span className="text-primary">anything</span> <br /> from people in your <br /> area
                    </h1>

                    <SignUpForm />
                </div>
            </div>
        </main>
    )
}
