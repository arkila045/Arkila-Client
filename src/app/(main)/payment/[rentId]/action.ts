'use server'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const confirmRental = async (formData: FormData) => {
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/transaction`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rent: formData.get('rentId'),
                type: 'item',
                paymentMethod: formData.get('paymentMethod')
            })
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/requests/to-pay')
    } catch (e: any) {
        console.log('Confirm rental: ' + e.message)
        return
    }

    redirect('/account/requests/to-pick-up')
}

export const payFee = async (formData: FormData) => {
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/transaction/service-fee`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rent: formData.get('rentId'),
                type: 'service_fee',
            })
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/listing/unpaid-service')
    } catch (e: any) {
        console.log('Confirm rental: ' + e.message)
        return
    }

    redirect('/account/listing/completed')
}