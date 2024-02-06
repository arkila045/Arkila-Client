import { authOption } from '@/app/api/auth/[...nextauth]/route'
import InfoCard from '@/components/InfoCard/infoCard'
import { IRent } from '@/models/RentModel'
import { EInfoCard } from '@/types/inforCardEnum'
import { getServerSession } from 'next-auth'
import React from 'react'

const getUnpaidServices = async (userId: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/rent/unpaid-service/${userId}`)
    return res.json()
}

export default async function page() {
    const session = await getServerSession(authOption)
    const unpaidServices: Array<IRent> = await getUnpaidServices(session?.user._id)

    return (
        <section className='my-8'>
            <div className='flex flex-col gap-2'>
                {unpaidServices.map((unpaidService, index) => (
                    <InfoCard
                        key={index}
                        rent={unpaidService}
                        type={EInfoCard.UNPAID_SERVICE}
                    />
                ))}
            </div>
        </section>
    )
}
