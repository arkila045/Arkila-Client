'use server'
import { storage } from "@/lib/firebaseStorage"
import { IStepOneState } from "./stepOne"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { IItem } from "@/models/ItemModel"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOption } from "@/app/api/auth/[...nextauth]/route"

export const addImage = async (prevState: any, formData: FormData) => {
    const result: IStepOneState = {
        success: false,
        message: null,
        imageURL: null
    }
    let storageRef

    try {
        const image = formData.get('imageURL') as File
        if (image.type.indexOf('image/') === -1) throw Error('File doesn\'t support or empty.')
        storageRef = ref(storage, 'items/' + Math.floor(Date.now() / 1000) + image.name)
        await uploadBytes(storageRef, image)
        const imageURL = await getDownloadURL(storageRef)

        result.imageURL = imageURL
        result.message = "Image uploaded"
        result.success = true
    } catch (e: any) {
        if (storageRef) {
            await deleteObject(storageRef)
        }

        result.success = false
        result.message = e.message
        result.imageURL = null
    }

    return result
}

export const addItem = async (item: IItem) => {
    try {
        const session = await getServerSession(authOption)
        if (!session) throw new Error('Not authorized')
        const res = await fetch(`${process.env.API_URI}/api/v1/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...item, owner: session?.user._id })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/listing/items')
        return data.message
    } catch (e: any) {
        return e.message
    }
}

export const editItem = async (itemId: string | any, item: IItem) => {
    try {
        const session = await getServerSession(authOption)
        if (!session) throw new Error('Not authorized')
        const res = await fetch(`${process.env.API_URI}/api/v1/item/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...item, owner: session?.user._id })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        revalidatePath('/account/listing/items')
        return data.message
    } catch (e: any) {
        return e.message
    }
}

export const requestUpgrade = async (userId: string) => {
    try {
        const res = await fetch(`${process.env.API_URI}/api/v1/upgrade`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userId,
                details: '+3 Slots upgrade',
                price: 999,
            })
        })
        await res.json()
        if (!res.ok) throw new Error('Failed to request upgrade.')
        return true
    } catch (e: any) {
        console.log('Request upgrade: ' + e.message)
    }

    return false
}