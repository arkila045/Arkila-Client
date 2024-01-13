import { useState } from "react"

interface IProps {
    description?: string,
    setDescription: (desc: string) => void
    submit: () => void,
    close: () => void
}
export default function StepThree({ setDescription, submit, close, description }: IProps) {

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        submit()
    }

    return (
        <>
            <div className="flex flex-col gap-8 mt-2">
                <div className="flex flex-col w-full gap-2 relative">
                    <label htmlFor={'description'}>Description</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className='border p-4 rounded-xl outline-main-blue'
                        cols={40}
                        rows={5}
                        defaultValue={description}
                        placeholder='Description'></textarea>
                </div>
            </div>

            <div className='flex justify-end mt-8'>
                <div className='flex gap-6'>
                    <button onClick={() => close()} className='text-xl font-medium'>Cancel</button>
                    <button
                        onClick={handleSubmit}
                        className='text-xl font-medium text-white bg-primary px-[30px] py-4 rounded-md'>
                        Publish
                    </button>
                </div>
            </div>
        </>
    )
}
