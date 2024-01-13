import { authOption } from '@/app/api/auth/[...nextauth]/route'
import InfoCard from '@/components/InfoCard/infoCard'
import { IRent } from '@/models/RentModel'
import { EInfoCard } from '@/types/inforCardEnum'
import { getServerSession } from 'next-auth'
import React from 'react'

const getAwaitingPayment = async (userId: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/rent/awaiting-payment/${userId}`)
    return res.json()
}

export default async function page() {
    const session = await getServerSession(authOption)
    const awaitingPayments: Array<IRent> = await getAwaitingPayment(session?.user._id)
    return (
        <section className='my-8'>
            <div className='flex flex-col gap-2'>
                {awaitingPayments.map((awaitingPayment, index) => (
                    <InfoCard
                        key={index}
                        rent={awaitingPayment}
                        type={EInfoCard.AWAITING_PAYMENT}
                    />
                ))}
            </div>
        </section>
    )
}
