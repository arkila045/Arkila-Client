'use client'
import Link from "next/link"
import { RiHomeLine } from '@react-icons/all-files/ri/RiHomeLine'
import { INavigation } from "@/types/navigationType"
import { FiUsers } from '@react-icons/all-files/fi/FiUsers'
import { PiCalendarCheck } from '@react-icons/all-files/pi/PiCalendarCheck'
import { useSelectedLayoutSegment } from "next/navigation"

export default function Navigation() {
    const segment = useSelectedLayoutSegment()

    const navigationLinks: INavigation[] = [
        {
            label: 'Dashboard',
            icon: <RiHomeLine size={24} />,
            href: '/admin/dashboard',
            isActive: segment === 'dashboard'
        },
        {
            label: 'Users',
            icon: <FiUsers size={24} />,
            href: '/admin/users',
            isActive: segment === 'users'
        },
        {
            label: 'Upgrade Requests',
            icon: <PiCalendarCheck size={24} />,
            href: '/admin/upgrade-requests',
            isActive: segment === 'upgrade-requests'
        }
    ]
    return (
        navigationLinks.map((navigationLink, index) => (
            <Link
                key={index}
                className={`py-4 pl-8 border-l-4 ${navigationLink.isActive ? 'border-red-800 text-primary' : 'border-white'} flex items-center gap-4 font-medium hover:bg-gray-100 duration-300`}
                href={navigationLink.href}>{navigationLink.icon} {navigationLink.label}</Link>
        ))

    )
}
