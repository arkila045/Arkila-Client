'use client'
import { useState } from 'react'

export default function Page() {
    const [option, setOption] = useState<'renter' | 'owner'>('renter')
    return (
        <section className='py-[120px]'>
            <div className='bg-white py-16 flex flex-col items-center gap-16 drop-shadow-sm'>
                <h1 className='font-bold text-4xl md:text-5xl lg:text-text-6xl xl:text-[80px]'>How it works</h1>
                <div className='flex gap-8'>
                    <button
                        onClick={() => setOption('renter')}
                        className={`font-medium text-2xl md:text-3xl xl:text-[39px] py-4 px-8 rounded-full ${option === 'renter' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                        Renters
                    </button>
                    <button
                        onClick={() => setOption('owner')}
                        className={`font-medium text-2xl md:text-3xl xl:text-[39px] py-4 px-8 rounded-full ${option === 'owner' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                        Owners
                    </button>
                </div>
                {option === 'renter' ? (
                    <div className='flex flex-col gap-8 container mx-auto'>
                        <h2 className='text-primary font-semibold text-2xl md:text-3xl xl:text-[39px] text-center'>SAVE MONEY</h2>
                        <div className='flex flex-col md:flex-row gap-8'>
                            <div className='text-center w-full'>
                                <h1 className='text-primary font-bold text-[80px]'>1</h1>
                                <h2 className='font-bold text-3xl'>Choose an item</h2>
                                <p className='font-medium text-xl'>Search for the things you want to rent and send a request</p>
                            </div>

                            <div className='text-center w-full'>
                                <h1 className='text-primary font-bold text-[80px]'>2</h1>
                                <h2 className='font-bold text-3xl'>Arrange the booking</h2>
                                <p className='font-medium text-xl'> Talk to the owners about the payment and pickup</p>
                            </div>

                            <div className='text-center w-full'>
                                <h1 className='text-primary font-bold text-[80px]'>3</h1>
                                <h2 className='font-bold text-3xl'>Enjoy your rental</h2>
                                <p className='font-medium text-xl'>Check the item and make the most out of it but don’t forget to return it</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-8 container mx-auto'>
                        <h2 className='text-primary font-semibold text-[39px] text-center'>SAVE MONEY</h2>
                        <div className='flex gap-8'>
                            <div className='text-center w-full'>
                                <h1 className='text-primary font-bold text-[80px]'>1</h1>
                                <h2 className='font-bold text-3xl'>Create Listing</h2>
                                <p className='font-medium text-xl'>List items and give them good description</p>
                            </div>

                            <div className='text-center w-full'>
                                <h1 className='text-primary font-bold text-[80px]'>2</h1>
                                <h2 className='font-bold text-3xl'>Aprove Rentals</h2>
                                <p className='font-medium text-xl'> Talk with the renter about the pickup and return</p>
                            </div>

                            <div className='text-center w-full'>
                                <h1 className='text-primary font-bold text-[80px]'>3</h1>
                                <h2 className='font-bold text-3xl'>Get Paid</h2>
                                <p className='font-medium text-xl'>Settle payment with the renter and get the item back</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}
