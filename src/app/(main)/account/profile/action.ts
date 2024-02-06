'use server'
import { authOption } from "@/app/api/auth/[...nextauth]/route"
import { storage } from "@/lib/firebaseStorage"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const updateProfile = async (formData: FormData) => {
    const session = await getServerSession(authOption)
    let storageRef
    let toUpdate = {}
    try {
        const image = formData.get('imageURL') as File
        if (image.size > 0) {
            storageRef = ref(storage, 'profiles/' + Math.floor(Date.now() / 1000) + '_' + session?.user._id)
            await uploadBytes(storageRef, image)
            const imageURL = await getDownloadURL(storageRef)
            toUpdate = { imageURL }
        }

        toUpdate = {
            ...toUpdate,
            name: {
                first: formData.get('firstName')?.toString().toLowerCase(),
                last: formData.get('lastName')?.toString().toLowerCase(),
                full: formData.get('firstName')?.toString().toLowerCase() + ' ' + formData.get('lastName')?.toString().toLowerCase()
            },
            address: {
                firstLine: formData.get('firstLine'),
                barangay: formData.get('barangay'),
                city: formData.get('city'),
                full: formData.get('firstLine') + ', ' + formData.get('barangay') + ', ' + formData.get('city')
            }
        }

        const res = await fetch(`${process.env.API_URI}/api/v1/user/${session?.user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toUpdate)
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/profile')
    } catch (e: any) {
        if (storageRef) {
            deleteObject(storageRef)
        }

        console.log('Update profile: ' + e.message)
    }
}