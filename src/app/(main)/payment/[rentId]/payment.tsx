'use client'
import { IRent } from "@/models/RentModel"
import { getPrice } from "@/utils/Utils"
import { useState } from "react"
import { confirmRental, payFee } from "./action"

interface IProps {
    rent: IRent
    type: 'item' | 'service_fee'
}


const ActionButton = ({ rent, type }: IProps) => {
    if (type === 'item') return (
        <button
            name="rentId"
            value={rent._id}
            className="text-xl bg-primary text-white py-4 w-[232px] rounded-md">
            Confirm Rental
        </button>
    )
    else if (type === 'service_fee') return (
        <button
            name="rentId"
            value={rent._id}
            className="text-xl bg-primary text-white py-4 w-[232px] rounded-md">
            Pay Fee
        </button>
    )
}

const getAction = (type: 'item' | 'service_fee') => {
    if (type === 'item') return confirmRental
    else if (type === 'service_fee') return payFee
    return undefined
}

export default function Payment({ rent, type }: IProps) {
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const [paymentMethod, setPaymentMethod] = useState<string>('cod')
    const totalPrice = getPrice(rent.startDate, rent.endDate, rent.item.pricePerDay)
    const serviceFee = getPrice(rent.startDate, rent.endDate, rent.item.pricePerDay) * 0.2
    const earnings = totalPrice - serviceFee
    return (
        <>
            <form action={getAction(type)} className="flex flex-col bg-white border border-gray-100">
                <input type="hidden" name="paymentMethod" value={paymentMethod} />
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-medium">Payment Method</h1>
                    <div className="flex gap-4">
                        <span>{type === 'item' ? paymentMethod === 'cod' ? 'Cash on delivery' : 'Gcash' : 'Cash on delivery'}</span>
                        {type === 'item' && (
                            <button type="button" onClick={() => setIsShowModal(true)} className="text-main-blue">Change</button>
                        )}
                    </div>
                </div>
                <div className="border border-gray-100"></div>
                <div className="p-4 flex flex-col gap-2">
                    {type === 'item' && (
                        <span className="text-xl flex justify-end">
                            Total price: <span className="text-primary font-medium">₱{getPrice(rent.startDate, rent.endDate, rent.item.pricePerDay)}</span>
                        </span>
                    )}

                    {type === 'service_fee' && (
                        <div className="text-xl flex justify-end flex-col items-end">
                            <div>Payment received: <span className="text-primary font-medium">₱{totalPrice}</span></div>
                            <div>Service fee: <span className="text-primary font-medium">₱{serviceFee}</span></div>
                            <div>Earnings: <span className="text-primary font-medium">₱{earnings}</span></div>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <ActionButton
                            rent={rent}
                            type={type}
                        />
                    </div>
                </div>
            </form>

            {isShowModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg flex flex-col gap-4 w-[429px]">
                        <h1 className="font-semibold text-xl">Payment method</h1>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    setPaymentMethod('gcash')
                                    setIsShowModal(false)
                                }}
                                className="p-4 text-left border border-gray-200 font-medium text-xl">
                                G-Cash
                            </button>
                            <button
                                onClick={() => {
                                    setPaymentMethod('cod')
                                    setIsShowModal(false)
                                }}
                                className="p-4 text-left border border-gray-200 font-medium text-xl">
                                Cash on Delivery
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
