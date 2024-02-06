'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Roboto } from 'next/font/google'
import InputBox from '@/components/inputBox'
import { useFormState, useFormStatus } from 'react-dom'
import { IState } from '@/types/initialStateType'
import { signUp, validate, validateStepTwo } from './action'
import { cities } from '@/utils/cities'
const roboto = Roboto({ weight: '400', subsets: ['latin'] })


export interface ISignUpState extends IState {
    email?: string | null,
    username?: string | null,
    contactNo?: string | null,
    password?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    address?: string | null,
    barangay?: string | null,
    city?: string | null,
    work?: string | null,
    role?: string | null
}

const initialState: ISignUpState = {
    success: false,
    message: null
}

const SignUpButton = ({ step }: { step: number }) => {
    const { pending } = useFormStatus()
    return (
        <button
            disabled={pending}
            className='py-3 bg-primary text-white w-full font-medium text-xl rounded-xl mt-2 hover:bg-red-800'>
            {pending ? 'Loading' : step !== 2 ? 'Continue' : 'Sign up'}
        </button>
    )
}


export default function SignUpForm() {
    const [step, setStep] = useState<number>(0)
    const [stepOneStatus, validateStepOneAction] = useFormState(validate, initialState)
    const [stepTwoStatus, validateStepTwoAction] = useFormState(validateStepTwo, initialState)
    const [status, signUpAction] = useFormState(signUp, initialState)

    useEffect(() => {
        if (stepOneStatus?.success) {
            setStep(1)
        }
    }, [stepOneStatus])

    useEffect(() => {
        if (stepTwoStatus?.success) {
            setStep(2)
        }
    }, [stepTwoStatus])

    return (
        <form action={step === 2 ? signUpAction : step === 0 ? validateStepOneAction : validateStepTwoAction} className="p-8 bg-white rounded-3xl h-fit w-full max-w-[512px]" >
            <h1 className="font-medium text-[55px]">Sign up</h1>
            <div className={`${step === 0 ? 'flex' : 'hidden'} flex-col gap-8 mt-8`}>
                <InputBox
                    id='firstName'
                    label='First Name'
                    placeholder='First Name'
                    type='text'
                    error={stepOneStatus?.firstName}
                />

                <InputBox
                    id='lastName'
                    label='Last Name'
                    placeholder='Last Name'
                    type='text'
                    error={stepOneStatus?.lastName}
                />

                <InputBox
                    id='address'
                    label='Address'
                    placeholder='Address'
                    type='text'
                    error={stepOneStatus?.address}
                />

                <div className="flex gap-4 max-w-full">
                    <InputBox
                        id='barangay'
                        label='Barangay'
                        placeholder='Barangay'
                        type='text'
                        error={stepOneStatus?.barangay}
                    />
                    <div className="flex flex-col w-full gap-2 relative">
                        <label htmlFor={'city'}>City</label>
                        <select id='city' name='city' className='w-full py-[19.6px]  rounded-xl border border-opacity-30 border-black outline-main-blue'>
                            <option value="">Select</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city.value}>{city.label}</option>
                            ))}
                        </select>
                        {stepOneStatus?.city && (
                            <label htmlFor={'city'} className="text-xs text-red-600">{stepOneStatus.city}</label>
                        )}
                    </div>

                </div>
            </div>

            <div className={`${step === 1 ? 'flex' : 'hidden'} flex-col gap-8 mt-8`}>
                <div className="flex flex-col w-full gap-2 relative">
                    <label htmlFor={'qa-work'}>What kind of work do you do?</label>
                    <select id='qa-work' name='qa-work' className='w-full py-[19.6px]  rounded-xl border border-opacity-30 border-black outline-main-blue'>
                        <option value="">Select</option>
                        <option value={'student'}>Student</option>
                        <option value={'employee'}>Employee/Profesionals</option>
                        <option value={'business-owners'}>Business owners</option>
                        <option value={'not-working'}>Not working</option>
                    </select>
                    {stepTwoStatus?.work && (
                        <label htmlFor={'qa-work'} className="text-xs text-red-600">{stepTwoStatus.work}</label>
                    )}
                </div>
                <div className="flex flex-col w-full gap-2 relative">
                    <label htmlFor={'qa-role'}>What role do you identify with most?</label>
                    <select id='qa-role' name='qa-role' className='w-full py-[19.6px]  rounded-xl border border-opacity-30 border-black outline-main-blue'>
                        <option value="">Select</option>
                        <option value={'renter'}>Renter</option>
                        <option value={'owner'}>Owner</option>
                        <option value={'both'}>Both</option>
                    </select>
                    {stepTwoStatus?.role && (
                        <label htmlFor={'qa-role'} className="text-xs text-red-600">{stepTwoStatus.role}</label>
                    )}
                </div>
            </div>

            <div className={`${step === 2 ? 'flex' : 'hidden'} flex-col gap-8 mt-8`}>
                <InputBox
                    id='email'
                    label='Enter your email address'
                    placeholder='Email'
                    type='email'
                    error={status.email}
                />

                <div className="flex gap-4 max-w-full">
                    <InputBox
                        id='username'
                        label='Username'
                        placeholder='Username'
                        type='text'
                        error={status.username}
                    />

                    <InputBox
                        id='contactNo'
                        label='Contact Number'
                        placeholder='Contact Number'
                        type='text'
                        error={status.contactNo}
                    />
                </div>

                <InputBox
                    id='password'
                    label='Enter your Password'
                    placeholder='Password'
                    type='password'
                    error={status.password}
                />
            </div>
            {
                step === 2 && (
                    <div className='flex mt-4 text-base gap-2'>
                        <input
                            id="agree"
                            type="checkbox" />

                        <label htmlFor="agree" className={`${roboto.className}`}>
                            I have read and agree to the <button type='button' className='text-main-blue'>Terms and Condition</button>
                        </label>
                    </div>
                )
            }

            <div className='mt-[52px] text-xs text-red-600'>{status.message}</div>
            <SignUpButton
                step={step}
            />

            <div className='mt-4 text-[13px] text-center'>
                Already have an account? <Link href={'/auth/signin'} className='text-main-blue'>Sign in</Link>
            </div>
        </form >
    )
}
