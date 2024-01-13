import useDropdown from '@/hooks/useDropdown'
import { HiOutlineUser } from '@react-icons/all-files/hi2/HiOutlineUser'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRef } from 'react'

export default function userProfileDropdown() {
    const ref = useRef<any>()
    const [toggle, setToggle] = useDropdown(false, ref)
    return (
        <div className='relative flex flex-col items-center z-10'>
            <button onClick={() => setToggle(!toggle)} className='text-primary'><HiOutlineUser size={28} /></button>
            {toggle && (
                <div ref={ref} className='absolute top-10 right-0 bg-white drop-shadow-md shadow-md whitespace-nowrap'>
                    <ul className='flex flex-col font-medium'>
                        <Link
                            className='p-4 '
                            href={'/account/profile'}>
                            My account
                        </Link>
                        <Link
                            className='p-4 '
                            href={'/account/requests/pending'}>
                            My requests
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className='p-4 text-left'>
                            Logout
                        </button>
                    </ul>
                </div>
            )}
        </div>
    )
}
