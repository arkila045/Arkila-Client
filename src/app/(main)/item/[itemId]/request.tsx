'use client'
import React, { useCallback, useOptimistic, useState } from 'react'
import { requestRent } from './action'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IRent } from '@/models/RentModel'
import { useFormStatus } from 'react-dom'

interface IProps {
    itemId?: string,
    pricePerDay?: number,
    rents: Array<IRent>
}

function incrementDate(dateInput: Date, increment: number) {
    var dateFormatTotime = new Date(dateInput);
    var increasedDate = new Date(dateFormatTotime.getTime() + (increment * 86400000));
    return increasedDate;
}

const SubmitButton = () => {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending} type='submit' className="bg-primary hover:bg-red-800 text-white p-4 w-fit rounded-md">
            {pending ? 'Loading' : 'Send a Request'}
        </button>
    )
}

export default function Request({ itemId, pricePerDay, rents }: IProps) {
    const [startDate, setStartDate] = useState<Date | null>()
    const [endDate, setEndDate] = useState<Date | null>()
    const [requestSent, setRequestSent] = useState<boolean>(false)
    const excludedDates = rents.map((rent) => {
        return { start: new Date(rent.startDate), end: new Date(rent.endDate) }
    })

    const getPrice = useCallback((a: Date | any, b: Date | any) => {
        if (!a || !b || !pricePerDay) return '₱' + 0
        const temp = new Date()
        const now = new Date(`${temp.getMonth() + 1}-${temp.getDate()}-${temp.getFullYear()}`)
        if (new Date(a) <= now) return 'Must be a date today.'

        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        const totalPrice = Math.floor((utc2 - utc1) / _MS_PER_DAY) * pricePerDay
        if (totalPrice <= 0) return 'Enter proper dates.'
        return '₱' + totalPrice;
    }, [pricePerDay])

    return (
        <>
            {requestSent && (
                <div className='fixed inset-0 h-screen w-full bg-black bg-opacity-30 z-50 flex justify-center items-center text-center'>
                    <div className='bg-white rounded-2xl p-8 w-[532px]'>
                        <h1 className='font-bold text-xl'>Request Sent!</h1>
                        <h3>You will be notified once the owner approves your request.</h3>
                        <button
                            onClick={() => setRequestSent(false)}
                            className='text-white text-xl px-4 py-2 w-fit bg-primary rounded-md mt-4'>
                            Close
                        </button>
                    </div>
                </div>
            )}


            <form action={async () => {
                if (!startDate || !endDate) return
                const a = startDate
                const b = endDate
                const temp = new Date()
                const now = new Date(`${temp.getMonth() + 1}-${temp.getDate()}-${temp.getFullYear()}`)
                if (new Date(a) <= now) return
                const _MS_PER_DAY = 1000 * 60 * 60 * 24;

                // Discard the time and time-zone information.
                const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
                const days = Math.floor((utc2 - utc1) / _MS_PER_DAY)
                if (days <= 0) return
                await requestRent(itemId, startDate, endDate)
                setRequestSent(true)
            }}>
                <div className="py-6 border-t flex gap-5 items-center">
                    <div>
                        <DatePicker
                            id='startDate'
                            name='startDate'
                            selected={startDate}
                            startDate={startDate}
                            endDate={endDate}
                            selectsStart
                            onChange={(date) => setStartDate(date)}
                            className='bg-[#FAFAFA] h-16 p-4'
                            minDate={incrementDate(new Date(), 1)}
                            placeholderText='From'
                            excludeDateIntervals={excludedDates}
                            autoComplete='off'
                        />
                    </div>
                    <span>to</span>
                    <div>
                        <DatePicker
                            id='endDate'
                            name='endDate'
                            selected={endDate}
                            startDate={startDate}
                            endDate={endDate}
                            selectsEnd
                            onChange={(date) => setEndDate(date)}
                            className='bg-[#FAFAFA] h-16 p-4'
                            minDate={startDate}
                            placeholderText='To'
                            excludeDateIntervals={excludedDates}
                            autoComplete='off'
                        />
                    </div>

                    {/* <input
                    onChange={(e) => setDate({ ...date, startDate: new Date(e.target.value) })}
                    className="bg-[#FAFAFA] p-4"
                    type="date"
                    name="startDate"
                    id="startDate" />
                <span>to</span>
                <input
                    onChange={(e) => setDate({ ...date, endDate: new Date(e.target.value) })}
                    className="bg-[#FAFAFA] p-4"
                    type="date"
                    name="endDate"
                    id="endDate" /> */}
                </div>
                <div className="flex flex-col gap-2">
                    <span>Total Price: <span className="text-primary font-medium">{getPrice(startDate, endDate)}</span></span>
                    <SubmitButton />
                </div>
            </form>


        </>

    )
}
