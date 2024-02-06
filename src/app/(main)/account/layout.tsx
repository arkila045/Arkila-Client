import { INavigation } from '@/types/navigationType'
import Image from 'next/image'
import React from 'react'
import Navigation from './navigation'
import { IUser } from '@/models/UserModel'
import { getServerSession } from 'next-auth'
import { authOption } from '../../api/auth/[...nextauth]/route'

interface IProps {
    children: React.ReactNode
}

const getUser = async (userId: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/user/${userId}`)
    return res.json()
}

export default async function layout({ children }: IProps) {
    const session = await getServerSession(authOption)
    const user: IUser = await getUser(session?.user._id)
    return (
        <main className='py-[120px] container mx-auto flex gap-8'>
            <nav className='w-[240px] h-fit'>
                <div className='flex items-center gap-2 w-full py-6'>
                    <Image className='w-10 h-10 object-cover rounded-full' src={user.imageURL || '/ava.webp'} alt='profile' height={40} width={40} />
                    <h1 className='font-semibold capitalize'>{user.name?.full}</h1>
                </div>
                <div className='w-full h-0.5 bg-gray-200'></div>
                <Navigation />
            </nav>

            {children}
        </main>
    )
}
