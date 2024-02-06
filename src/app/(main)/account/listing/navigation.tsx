'use client'

import { INavigation } from "@/types/navigationType"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

export default function Navigation() {
    const segment = useSelectedLayoutSegment()
    const navigations: Array<INavigation> = [
        {
            label: 'Listed Items',
            href: '/account/listing/items',
            isActive: segment === 'items'
        },
        {
            label: 'Requests',
            href: '/account/listing/requests',
            isActive: segment === 'requests'
        },
        {
            label: 'Awaiting Payment',
            href: '/account/listing/awaiting-payment',
            isActive: segment === 'awaiting-payment'
        },
        {
            label: 'Rent out',
            href: '/account/listing/rent-out',
            isActive: segment === 'rent-out'
        },
        {
            label: 'Unpaid Service Fee',
            href: '/account/listing/unpaid-service',
            isActive: segment === 'unpaid-service'
        },
        {
            label: 'Completed',
            href: '/account/listing/completed',
            isActive: segment === 'completed'
        }
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
