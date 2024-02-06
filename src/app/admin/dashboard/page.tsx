import React from 'react'
import { FiUsers } from '@react-icons/all-files/fi/FiUsers'
import { PiCalendarCheck } from '@react-icons/all-files/pi/PiCalendarCheck'
import { number } from 'zod'

interface ICount {
    userCount: number,
    requestCount: number
}
const getCounts = async () => {
    const res = await fetch(`${process.env.API_URI}/api/v1/admin/count`, {
        cache: 'no-store'
    })
    return res.json()
}
export default async function page() {
    const overview: ICount = await getCounts()
    return (
        <main className='flex w-full h-fit gap-6 py-6 px-8 text-primary'>
            <div className='flex items-center justify-between p-6 bg-white w-full rounded-lg border border-gray-200'>
                <div className='flex gap-4 items-center'>
                    <h1 className='font-semibold text-2xl'>Current users</h1>
                    <h2 className='font-bold text-3xl'>{overview.userCount}</h2>
                </div>
                <FiUsers size={78} />
            </div>
            <div className='flex items-center justify-between p-6 bg-white w-full rounded-lg border border-gray-200'>
                <div className='flex gap-4 items-center'>
                    <h1 className='font-semibold text-2xl'>Upgrade Requests</h1>
                    <h2 className='font-bold text-3xl'>{overview.requestCount}</h2>
                </div>
                <PiCalendarCheck size={78} />
            </div>
        </main>
    )
}
