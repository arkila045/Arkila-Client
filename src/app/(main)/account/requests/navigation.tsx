'use client'
import { INavigation } from '@/types/navigationType'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

export default function Navigation() {
    const segment = useSelectedLayoutSegment()
    const navigations: Array<INavigation> = [
        {
            label: 'Pending',
            href: '/account/requests/pending',
            isActive: segment === 'pending'
        },
        {
            label: 'To Pay',
            href: '/account/requests/to-pay',
            isActive: segment === 'to-pay'
        },
        {
            label: 'To Pick Up',
            href: '/account/requests/to-pick-up',
            isActive: segment === 'to-pick-up'
        },
        {
            label: 'Renting',
            href: '/account/requests/renting',
            isActive: segment === 'renting'
        },
        {
            label: 'Completed',
            href: '/account/requests/completed',
            isActive: segment === 'completed'
        },
    ]
    return (
        <nav className='bg-white h-fit flex'>
            <ul className='flex py-4 w-full font-medium'>
                {navigations.map((navigation, index) => (
                    <li key={index} className='w-full text-center'>
                        <Link className={`${navigation.isActive && 'text-primary'} hover:text-primary`} href={navigation.href}>
                            {navigation.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
