import { Metadata } from 'next'
import SignInForm from './signInForm'

export const metadata: Metadata = {
    title: 'Sign in'
}

export default function page() {
    return (
        <main className="bg-main min-h-screen bg-cover py-52">
            <div className="flex justify-between container mx-auto">
                <div className='flex flex-col lg:flex-row gap-5 justify-between w-full'>
                    <h1 className="h-fit text-5xl  px-4 border-l-[20px] border-primary text-white font-medium sapce leading-relaxed">
                        Rent <span className="text-primary">anything</span> <br /> from people in your <br /> area
                    </h1>
                    <SignInForm />
                </div>
            </div>
        </main>
    )
}
