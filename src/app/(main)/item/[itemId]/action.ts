'use server'
import { authOption } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const requestRent = async (itemId: string | any, startDate: Date | any, endDate: Date | any) => {
    try {
        const session = await getServerSession(authOption)
        if (!session) throw new Error('Not authorized.')
        const res = await fetch(`${process.env.API_URI}/api/v1/rent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                renterId: session.user._id,
                itemId,
                startDate,
                endDate
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/item')
    } catch (e: any) {
        console.log(e.message)
    }
}