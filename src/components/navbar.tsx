'use client'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch'
import { IoMdCloseCircle } from '@react-icons/all-files/io/IoMdCloseCircle'
import { GoBell } from '@react-icons/all-files/go/GoBell'
import { signOut, useSession } from 'next-auth/react'
import UserProfile from './userProfileDropdown'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Navbar() {
    const { status, data } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchBar, setSearchBar] = useState<boolean>(false)

    const createQueryString = useCallback(
        (name: string, value: string | any) => {
            const params = new URLSearchParams(searchParams.toString())
            if (!value) {
                params.delete(name)
                return params.toString()
            }
            params.set(name, value)
            if (data?.user.address?.city && !params.get('location')) {
                params.set('location', data?.user.address?.city)
            }
            return params.toString()
        },
        [searchParams, status]
    )
    return (
        <nav className="bg-white absolute h-[104px]  md:h-[88px] w-full drop-shadow-sm px-5 md:px-0 flex z-50">
            <section className="flex flex-col md:flex-row py-2 justify-between items-center w-full container mx-auto md:gap-5">
                {searchBar && (
                    <div className='absolute top-0 left-0 h-full w-full flex items-center bg-white px-5 md:hidden z-50'>
                        <div className='relative w-full'>
                            <input type="text" className='w-full px-4 py-2 rounded-full bg-gray-100 outline-primary' placeholder='Search for a product...' />
                            <button
                                onClick={() => setSearchBar(false)}
                                className='absolute right-3 translate-y-1/2 text-primary'>
                                <IoMdCloseCircle size={20} />
                            </button>
                        </div>
                    </div>
                )}

                <div className='flex items-center gap-14'>
                    <Link href={'/'}>
                        <Image className="w-36 lg:w-full" src={'/arkila_logo.png'} alt="logo" height={56} width={254} />
                    </Link>

                    <div className='relative hidden md:block'>
                        <input
                            onKeyDown={(e) =>
                                e.code === 'Enter' &&
                                router.push(`/catalog` + '?' + createQueryString('search', e.currentTarget.value))
                            }
                            type="text"
                            className='outline-primary rounded-full border border-primary px-4 py-2 gap-28 w-[280px] lg:w-[400px] xl:w-[514px] duration-300'
                            placeholder='Search for a product...' />
                        <button className='absolute right-3 top-1/2 -translate-y-1/2 text-primary'><IoIosSearch size={22} /></button>
                    </div>
                </div>

                <div className="flex gap-5 md:gap-10 items-center">
                    <button className='md:hidden text-primary' onClick={() => setSearchBar(true)}><IoIosSearch size={28} /></button>

                    {status === 'authenticated' && (
                        <>
                            <button className='text-primary'><GoBell size={28} /></button>
                            <UserProfile />
                        </>
                    )}

                    {status === 'unauthenticated' && (
                        <>
                            <Link href={'/guide'}>How it works</Link>
                            <Link href={'/auth/signin'}>Login</Link>
                            <Link href={'/auth/signup'} className="px-8 py-4 bg-primary text-white rounded-[30px] hover:bg-red-800 duration-300">Register</Link>
                        </>
                    )}
                </div>

            </section>


        </nav>
    )
}
