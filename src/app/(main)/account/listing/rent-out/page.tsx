import { authOption } from '@/app/api/auth/[...nextauth]/route'
import InfoCard from '@/components/InfoCard/infoCard'
import { IRent } from '@/models/RentModel'
import { EInfoCard } from '@/types/inforCardEnum'
import { getServerSession } from 'next-auth'
import React from 'react'

const getRentOut = async (userId: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/rent/rent-out/${userId}`)
    return res.json()
}

export default async function page() {
    const session = await getServerSession(authOption)
    const rentOuts: Array<IRent> = await getRentOut(session?.user._id)

    return (
        <section className='my-8'>
            <div className='flex flex-col gap-2'>
                {rentOuts.map((rentOut, index) => (
                    <InfoCard
                        key={index}
                        rent={rentOut}
                        type={EInfoCard.RENT_OUT}
                    />
                ))}
            </div>
        </section>
    )
}
