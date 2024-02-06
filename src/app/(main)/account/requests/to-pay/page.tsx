import { authOption } from '@/app/api/auth/[...nextauth]/route'
import InfoCard from '@/components/InfoCard/infoCard'
import { IRent } from '@/models/RentModel'
import { EInfoCard } from '@/types/inforCardEnum'
import { getServerSession } from 'next-auth'
import React from 'react'

const getPendings = async (userId: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/rent/to-pay/${userId}`, {
        cache: 'no-store'
    })
    return res.json()
}

export default async function page() {
    const session = await getServerSession(authOption)
    const pendings: Array<IRent> = await getPendings(session?.user._id)
    return (
        <section className='my-8'>
            <div className='flex flex-col gap-2'>
                {pendings.map((pending, index) => (
                    <InfoCard
                        key={index}
                        rent={pending}
                        type={EInfoCard.TO_PAY}
                    />
                ))}
            </div>
        </section>
    )
}
