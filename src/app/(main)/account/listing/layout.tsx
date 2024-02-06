import { INavigation } from '@/types/navigationType'
import Link from 'next/link'
import React from 'react'
import Navigation from './navigation'

interface IProps {
    children: React.ReactNode
}


export default function layout({ children }: IProps) {
    return (
        <main className='flex flex-col w-full'>
            <Navigation />
            {children}
        </main>
    )
}
