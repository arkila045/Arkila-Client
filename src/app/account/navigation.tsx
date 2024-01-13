'use client'

import { INavigation } from "@/types/navigationType"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { Fragment } from "react"

export default function Navigation() {
    const segment = useSelectedLayoutSegment()
    const navigations: Array<INavigation> = [
        {
            label: 'My account',
            href: '/account/profile',
            subNav: [
                {
                    label: 'Profile',
                    href: '/account/profile',
                    isActive: segment === 'profile'
                },
                // {
                //     label: 'Change Password',
                //     href: '/account/password',
                //     isActive: segment === 'password'
                // }
            ]
        },
        {
            label: 'My requests',
            href: '/account/requests/pending',
            isActive: segment === 'requests'
        },
        {
            label: 'Item listing',
            href: '/account/listing/items',
            isActive: segment === 'listing'
        },
        {
            label: 'Notifications',
            href: '/account/notifications',
            isActive: segment === 'notifications'
        }
    ]
    return (
        <section className='py-6 flex flex-col gap-2'>
            {navigations.map((navigation, index) => (
                <Fragment key={index}>
                    <Link className={`font-semibold p-2 ${navigation.isActive && 'text-primary'}`} key={index} href={navigation.href}>{navigation.label}</Link>
                    {navigation.subNav && navigation.subNav.map((sub, innerIndex) => (
                        <Link className={`p-2 ${sub.isActive && 'text-primary'}`} key={innerIndex} href={sub.href}>{sub.label}</Link>
                    ))}
                </Fragment>
            ))}
        </section>
    )
}
