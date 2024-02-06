'use server'

import { revalidatePath } from "next/cache"

export const updateStatus = async (formData: FormData) => {
    try {
        if (formData.get('approve')) {
            const res = await fetch(`${process.env.API_URI}/api/v1/upgrade/${formData.get('upgradeId')}`, {
                cache: 'no-store',
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: formData.get('userId'),
                    status: 'approved'
                })
            })
            await res.json()
            if (!res.ok) throw new Error('Failed to update.')
        }
        else {
            const res = await fetch(`${process.env.API_URI}/api/v1/upgrade/${formData.get('upgradeId')}`, {
                cache: 'no-store',
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: formData.get('userId'),
                    status: 'rejected'
                })
            })
            await res.json()
            if (!res.ok) throw new Error('Failed to update.')
        }
    } catch (e: any) {
        console.log('Update status: ' + e.message)
    }

    revalidatePath('/admin/upgrade-requests')
}