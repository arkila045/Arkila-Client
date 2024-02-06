import React from 'react'

export default function page() {
    return (
        <main className='py-[120px] container mx-auto'>
            <h1 className='font-bold text-4xl xl:text-6xl 2xl:text-[80px] text-center'>Frequently Asked Questions</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-16 gap-y-4'>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl'>How do I place a rental order?</h1>
                    <p className='font-medium text-xl'>
                        Placing a rental order is easy! Simply browse our catalog, select the items you need, and follow the checkout process to complete your order.
                    </p>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl'>What is the rental duration?</h1>
                    <p className='font-medium text-xl'>
                        Rental durations vary based on the item. The specific rental period for each item is clearly stated on the product page.
                    </p>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl'>Can I modify or cancel my order?</h1>
                    <p className='font-medium text-xl'>
                        Modifications and cancellations are subject to our terms and conditions. Please contact our customer support for assistance.
                    </p>
                </div>

                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl'>Is there a security deposit for rentals?</h1>
                    <p className='font-medium text-xl'>
                        Yes, a security deposit is required for most rental items. This deposit is refundable upon the undamaged and timely return of the items.
                    </p>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl'>How is the rental fee calculated?</h1>
                    <p className='font-medium text-xl'>
                        Rental fees are typically based on the duration of the rental period. The total cost, including any applicable taxes and fees, is provided during the checkout process.
                    </p>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-3xl'>What happens if I return the items late?</h1>
                    <p className='font-medium text-xl'>
                        Late returns may incur additional charges. Contact us if you anticipate any issues with the return date to discuss possible extensions.
                    </p>
                </div>
            </div>
        </main>
    )
}
