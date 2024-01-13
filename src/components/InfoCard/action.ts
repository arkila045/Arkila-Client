'use server'
import { revalidatePath } from "next/cache"

export const approvalStatus = async (status: string | any, rentId: string | any) => {
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/rent/requests/status/${rentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/listing/requests')
    } catch (e: any) {
        console.log(e.message)
    }
}

export const paymentReceived = async (rentId: string | any) => {
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/rent/awaiting-payment/status/${rentId}`, {
            method: 'PATCH'
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/listing/awaiting-payment')
    } catch (e: any) {
        console.log(e.message)
    }
}

export const itemReturnedOwner = async (rentId: string | any) => {
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/rent/rent-out/status/${rentId}`, {
            method: 'PATCH'
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/listing/rent-out')
    } catch (e: any) {
        console.log(e.message)
    }
}

export const cancelRequest = async (rentId: string | any) => {
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/rent/pending/action/${rentId}`, {
            method: 'DELETE'
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/requests/pending')
    } catch (e: any) {
        console.log(e.message)
    }
}

export const updateStatus = async (rentId: string | any, updateBody: any) => {
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/rent/${rentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateBody)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/requests/pending')
    } catch (e: any) {

        console.log(rentId)
        console.log(e.message)
    }
}