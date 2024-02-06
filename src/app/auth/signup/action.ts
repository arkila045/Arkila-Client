'use server'
import { redirect } from 'next/navigation'
import z from 'zod'
import { ISignUpState } from './signUpForm'
import { cookies } from 'next/headers'

const UserSchema = z.object({
    email: z.string().min(1, { message: 'email is required.' }).email({ message: 'invalid email.' }),
    username: z.string().min(1, { message: 'username is required.' }),
    contactNo: z.string().min(1, { message: 'contact number is required.' }),
    password: z.string().min(5, { message: 'put atleast 5 characters.' })
})

const stepOne = z.object({
    firstName: z.string().min(1, { message: 'First name is required.' }),
    lastName: z.string().min(1, { message: 'Last name is required.' }),
    address: z.string().min(1, { message: 'Address is required.' }),
    barangay: z.string().min(1, { message: 'Barangay is required.' }),
    city: z.string().min(1, { message: 'City is required.' })
})

const stepTwo = z.object({
    work: z.string().min(1, { message: 'Required.' }),
    role: z.string().min(1, { message: 'Required.' })
})

export const signUp = async (prevState: any, formData: FormData) => {
    const result: ISignUpState = {
        success: false,
        message: null,
        email: null,
        username: null,
        contactNo: null,
        password: null
    }
    try {
        const userClean = await UserSchema.parse({
            email: formData.get('email'),
            username: formData.get('username'),
            contactNo: formData.get('contactNo'),
            password: formData.get('password')
        })
        const res = await fetch(`${process.env.API_URI}/api/v1/auth/signup`, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userClean.email,
                username: userClean.username,
                contactNo: userClean.contactNo,
                password: userClean.password,
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                address: formData.get('address'),
                barangay: formData.get('barangay'),
                city: formData.get('city'),
                qa_work: formData.get('qa-work'),
                qa_role: formData.get('qa-role')
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        cookies().set({
            name: 'email',
            value: userClean.email,
            secure: true
        })
    } catch (e) {
        if (e instanceof z.ZodError) {
            e.errors.map((value, index) => {
                const indexResult = value.path[0].toString()
                if (!result[indexResult]) {
                    result[indexResult] = value.message
                }
            })
        }

        if (e instanceof Error) {
            result.message = e.message
        }
        return result
    }
    redirect('/auth/otp')
}


export const validate = async (prevState: any, formData: FormData) => {
    const result: ISignUpState = {
        success: false,
        message: null,
        firstName: null,
        lastName: null,
        address: null,
        barangay: null,
        city: null,
    }

    try {
        await stepOne.parse({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            address: formData.get('address'),
            barangay: formData.get('barangay'),
            city: formData.get('city')
        })
        result.success = true
        return result
    } catch (e) {
        if (e instanceof z.ZodError) {
            e.errors.map((value, index) => {
                const indexResult = value.path[0].toString()
                if (!result[indexResult]) {
                    result[indexResult] = value.message
                }
            })
        }
        if (e instanceof Error) {
            result.message = e.message
        }
        return result
    }
}

export const validateStepTwo = async (prevState: any, formData: FormData) => {
    const result: ISignUpState = {
        success: false,
        message: null,
        work: null,
        role: null
    }

    try {
        await stepTwo.parse({
            work: formData.get('qa-work'),
            role: formData.get('qa-role'),
        })
        result.success = true
        return result
    } catch (e) {
        if (e instanceof z.ZodError) {
            e.errors.map((value, index) => {
                const indexResult = value.path[0].toString()
                if (!result[indexResult]) {
                    result[indexResult] = value.message
                }
            })
        }
        if (e instanceof Error) {
            result.message = e.message
        }
        return result
    }
}