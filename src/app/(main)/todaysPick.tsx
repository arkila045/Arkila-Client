import ItemCard from '@/components/itemCard/itemCard'
import { IItem } from '@/models/ItemModel'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOption } from '../api/auth/[...nextauth]/route'

const getItems = async (location: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/item${location ? '?location=' + location : ''}`)
    return res.json()
}
export default async function TodaysPick() {
    const session = await getServerSession(authOption)
    const items: Array<IItem> = await getItems(session?.user.address?.city)
    return (
        <section className='mt-8 py-8 bg-white drop-shadow-sm px-5 md:px-0'>
            <div className='container mx-auto'>
                <div className='p-4 bg-primary'>
                    <h1 className='text-white font-bold text-xl'>TODAY’S PICK</h1>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8 pt-4 duration-300'>
                    {items.map((item, index) => (
                        <ItemCard
                            key={index}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
