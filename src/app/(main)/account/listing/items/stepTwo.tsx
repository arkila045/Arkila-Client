import InputBox from '@/components/inputBox'
import { IItem } from '@/models/ItemModel'
import { cities } from '@/utils/cities'
import { categories } from '@/utils/instrumentCategories'
import { useSession } from 'next-auth/react'
import React, { useRef } from 'react'
import z from 'zod'

const StepTwoObject = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    pricePerDay: z.number().min(1, { message: 'Price is required.' }),
    location: z.string().min(1, { message: 'Location is required' }),
    category: z.string().min(1, { message: 'Category is required' })
})

interface IProps {
    item?: IItem,
    nextStep: () => void,
    stepTwoData: (data: any) => void,
    close: () => void
}

export default function StepTwo({ nextStep, stepTwoData, close, item }: IProps) {
    const { data } = useSession()
    const formRef = useRef<HTMLFormElement>(null)
    return (
        <>
            <form ref={formRef} action={(formData: FormData) => {
                try {
                    const title = formData.get('title')
                    const pricePerDay = Number(formData.get('pricePerDay'))
                    const location = formData.get('location')
                    const category = formData.get('category')

                    const stepTwoClean = StepTwoObject.parse({
                        title,
                        pricePerDay,
                        location,
                        category
                    })

                    stepTwoData(stepTwoClean)
                    nextStep()
                } catch (e) {

                }
            }} className="flex flex-col gap-8 mt-2">
                <InputBox
                    label='Title'
                    id='title'
                    placeholder='Title'
                    type='text'
                    defaultValue={item?.title}
                />

                <InputBox
                    label='Price per day'
                    id='pricePerDay'
                    placeholder='Price per day'
                    type='number'
                    defaultValue={item?.pricePerDay}
                />

                <div className="flex flex-col w-full gap-2 relative">
                    <label htmlFor={'location'}>Location</label>
                    <select
                        id='location'
                        name='location'
                        defaultValue={item?.location || data?.user.address?.city}
                        className="w-full placeholder:text-[13px] px-4 py-[18px] rounded-xl border border-opacity-30 border-black outline-main-blue">
                        <option value="">Select</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.value}>{city.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col w-full gap-2 relative">
                    <label htmlFor={'category'}>Category</label>
                    <select
                        id='category'
                        name='category'
                        defaultValue={item?.category}
                        className="w-full placeholder:text-[13px] px-4 py-[18px] rounded-xl border border-opacity-30 border-black outline-main-blue">
                        <option value="">Select</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.value}>{category.label}</option>
                        ))}
                    </select>
                </div>
            </form >

            <div className='flex justify-end mt-8'>
                <div className='flex gap-6'>
                    <button onClick={() => close()} className='text-xl font-medium'>Cancel</button>
                    <button onClick={() => formRef.current?.requestSubmit()}
                        className='text-xl font-medium text-white bg-primary px-[30px] py-4 rounded-md'>
                        Next
                    </button>
                </div>
            </div>

        </>
    )
}
