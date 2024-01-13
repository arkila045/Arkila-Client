import { authOption } from '@/app/api/auth/[...nextauth]/route'
import InfoCard from '@/components/InfoCard/infoCard'
import { IRent } from '@/models/RentModel'
import { EInfoCard } from '@/types/inforCardEnum'
import { getServerSession } from 'next-auth'

const getCompleted = async (userId: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/rent/renter/completed/${userId}`, {
        cache: 'no-store'
    })
    return res.json()
}

export default async function page() {
    const session = await getServerSession(authOption)
    const completedRents: Array<IRent> = await getCompleted(session?.user._id)
    return (
        <section className='my-8'>
            <div className='flex flex-col gap-2'>
                {completedRents.map((completedRent, index) => (
                    <InfoCard
                        key={index}
                        rent={completedRent}
                        type={EInfoCard.COMPLETED}
                    />
                ))}
            </div>
        </section>
    )
}
