import { IState } from '@/types/initialStateType'
import { LuUpload } from '@react-icons/all-files/lu/LuUpload'
import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { addImage } from './action'
import Image from 'next/image'

interface IProps {
    imageURL?: string,
    setImageURL: (url: string) => void,
    nextStep: () => void,
    close: () => void
}

export interface IStepOneState extends IState {
    imageURL: string | null
}

const initialState: IStepOneState = {
    success: false,
    message: null,
    imageURL: null
}

export default function StepOne({ setImageURL: saveImageURL, nextStep, close, imageURL: editImageURL }: IProps) {
    const ref = useRef<HTMLFormElement>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imageURL, setImageURL] = useState<string | null>(editImageURL || null)
    const [status, formAction] = useFormState(addImage, initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return
        setIsLoading(true)
        ref.current?.requestSubmit()
    }

    useEffect(() => {
        setIsLoading(false)
        if (!status.success || !status.imageURL) return

        setImageURL(status.imageURL)
        saveImageURL(status.imageURL)
        ref.current?.reset()

    }, [status])

    return (
        <>
            <h2 className="mt-4">Image</h2>
            <form ref={ref} action={formAction} className="flex justify-center mt-2">
                <div className="w-60 h-60 border border-dashed rounded-lg flex flex-col items-center justify-center">
                    {isLoading ?
                        ('Loading') :
                        imageURL ? (<Image className='h-full w-full object-cover' src={imageURL} alt='item' height={240} width={240} />) : (
                            <>
                                <input accept='image/*' className='hidden' name="imageURL" type="file" id='itemImage' onChange={handleChange} />
                                <LuUpload size={48} />
                                <h1 className='mt-6 font-medium text-xl'>Add Photos</h1>
                                <label htmlFor='itemImage' className='cursor-pointer border border-main-blue px-4 py-2 uppercase rounded-md text-main-blue mt-4'>Select file</label>
                            </>
                        )}

                </div>
            </form>

            <div className='flex justify-end mt-8'>
                <div className='flex gap-6'>
                    <button onClick={() => close()} className='text-xl font-medium'>Cancel</button>
                    <button onClick={() => nextStep()}
                        className='text-xl font-medium text-white bg-primary px-[30px] py-4 rounded-md'>
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}
