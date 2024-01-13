'use client'
import Image from "next/image";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { EInfoCard } from "@/types/inforCardEnum";
import { IRent } from "@/models/RentModel";
import { approvalStatus, cancelRequest, itemReturnedOwner, paymentReceived, updateStatus } from "./action";
import { useFormStatus } from "react-dom";
import { IUser } from "@/models/UserModel";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: '500' })


interface IProps {
    type: EInfoCard | null,
    rent: IRent
}

const getCardTitle = (type: EInfoCard | null) => {
    if (type === EInfoCard.REQUESTS) return 'Requesting'
    else if (type === EInfoCard.AWAITING_PAYMENT) return 'Awaiting Payment'
    else if (type === EInfoCard.RENT_OUT) return 'Rent out'
    else if (type === EInfoCard.UNPAID_SERVICE) return 'Unpaid Service Fee'
    else if (type === EInfoCard.PENDING) return 'Pending'
    else if (type === EInfoCard.TO_PAY) return 'To Pay'
    else if (type === EInfoCard.TO_PICK_UP) return 'To Pick Up'
    else if (type === EInfoCard.RENTING) return 'Renting'
    return null
}

const getAction = (type: EInfoCard | null) => {
    if (type === EInfoCard.REQUESTS) return async (formData: FormData) => {
        const status = formData.get('status')
        const rentId = formData.get('rentId')
        await approvalStatus(status, rentId)
    }
    else if (type === EInfoCard.AWAITING_PAYMENT) return async (formData: FormData) => {
        const rentId = formData.get('rentId')
        await paymentReceived(rentId)
    }
    else if (type === EInfoCard.RENT_OUT) return async (formData: FormData) => {
        const rentId = formData.get('rentId')
        // await itemReturnedOwner(rentId)
        await updateStatus(rentId, {
            status: 'completing',
            isItemReturnedOwner: true
        })
    }
    else if (type === EInfoCard.PENDING) return async (formData: FormData) => {
        const rentId = formData.get('rentId')
        await cancelRequest(rentId)
    }
    else if (type === EInfoCard.TO_PICK_UP) return async (formData: FormData) => {
        const rentId = formData.get('rentId')
        await updateStatus(rentId, {
            status: 'returning',
            isItemReceived: true
        })
    }
    return undefined
}

const ActionButtons = ({ type, rent }: { type: EInfoCard | null, rent?: IRent }) => {
    const { pending } = useFormStatus()
    if (type === EInfoCard.REQUESTS) return (<>
        <button disabled={pending} name="status" value='reject' className="font-medium text-xl">
            {pending ? 'Loading' : 'Reject'}
        </button>
        <button disabled={pending} name="status" value='accept' className="bg-primary hover:bg-red-800 duration-300 py-4 w-[232px] text-xl font-medium text-white rounded-[4px]">
            {pending ? 'Loading' : 'Accept'}
        </button>
    </>)
    else if (type === EInfoCard.AWAITING_PAYMENT) return (<>
        {/* <button disabled={pending || rent?.isPaymentReceived} type="submit" className={"bg-primary hover:bg-red-800 duration-300 py-4 w-[232px] text-xl font-medium text-white rounded-[4px] disabled:bg-gray-300"}>
            {rent?.isPaymentReceived ? 'Waiting for client' : pending ? 'Loading' : 'Payment Received'}
        </button> */}
    </>)
    else if (type === EInfoCard.RENT_OUT) return (<>
        <button disabled={pending || rent?.isItemReturnedOwner} type="submit" className={"bg-primary hover:bg-red-800 duration-300 py-4 w-[232px] text-xl font-medium text-white rounded-[4px] disabled:bg-gray-300"}>
            {rent?.isItemReturnedOwner ? 'Waiting for client' : pending ? 'Loading' : 'Item Returned'}
        </button>
    </>)
    else if (type === EInfoCard.UNPAID_SERVICE) return (<>
        <Link
            href={'/payment/service-fee/' + rent?._id}
            type="submit"
            className={"text-center bg-primary hover:bg-red-800 duration-300 py-4 w-[232px] text-xl font-medium text-white rounded-[4px] disabled:bg-gray-300"}>
            Pay
        </Link>
    </>)
    else if (type === EInfoCard.PENDING) return (<>
        <button type="submit" className={"hover:bg-gray-100 duration-300 py-4 px-3 text-xl font-medium border border-gray-200 text-gray-400 rounded-[4px] disabled:bg-gray-300"}>
            {pending ? 'Loading' : 'Cancel Request'}
        </button>
    </>)
    else if (type === EInfoCard.TO_PAY) return (<>
        <Link
            href={'/payment/' + rent?._id}
            type="submit"
            className={"bg-primary text-center hover:bg-red-800 duration-300 py-4 w-[232px] text-xl font-medium text-white rounded-[4px] disabled:bg-gray-300"}>
            Proceed to payment
        </Link>
    </>)
    else if (type === EInfoCard.TO_PICK_UP) return (<>
        <button type="submit" className={"bg-primary hover:bg-red-800 duration-300 py-4 w-[232px] text-xl font-medium text-white rounded-[4px] disabled:bg-gray-300"}>
            Item Received
        </button>
    </>)
    return null
}

const getPrice = (a: Date | any, b: Date | any, pricePerDay: number | any) => {
    if (!a || !b || !pricePerDay) return 0
    a = new Date(a)
    b = new Date(b)
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const totalPrice = Math.floor((utc2 - utc1) / _MS_PER_DAY) * pricePerDay
    if (totalPrice <= 0) return 0
    return totalPrice;
}

const formDate = (date: Date) => {
    const utcDate = new Date(date)
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(utcDate);
    return formattedDate
}

const TotalType = ({ startDate, endDate, pricePerDay, type }: { startDate: Date | any, endDate: Date | any, pricePerDay: number | any, type: EInfoCard | any }) => {
    if (type === EInfoCard.UNPAID_SERVICE) return (<>
        <span className="text-xl">Service Fee: <span className="text-primary font-medium">₱{getPrice(startDate, endDate, pricePerDay) * 0.2}</span></span>
    </>)

    return (<>
        <span className="text-xl">Total Price: <span className="text-primary font-medium">₱{getPrice(startDate, endDate, pricePerDay)}</span></span>
    </>)
}

const UserInfo = ({ user, type }: { user: IUser | undefined, type: EInfoCard | any }) => {
    return (<>
        <div className="flex gap-4">
            <div className="flex gap-2 after:border after:ml-2">
                <Image className="h-6 w-6 rounded-full bg-cover" src={'/ava.webp'} alt="profile" height={24} width={24} />
                <h1>{user?.username}</h1>
            </div>
            <span className="after:border after:ml-4 capitalize">{user?.address?.full}</span>
            <span>{user?.contactNo}</span>
        </div>
        <span className={roboto.className + ' font-medium text-primary text-xl'}>{getCardTitle(type)}</span>
    </>)
}

export default function InfoCard({ type, rent }: IProps) {
    if (type === null || type === undefined) return null
    return (
        <form action={getAction(type)} className={"p-4 flex flex-col bg-white"}>
            <input type="hidden" name="rentId" value={rent._id} />
            <div className={"py-5 flex justify-between items-center " + inter.className}>
                <UserInfo
                    user={type <= 4 ? rent.renter : rent.item.owner}
                    type={type}
                />
            </div>
            <div className="py-2 pr-2 flex justify-between items-center border-t border-b">
                <div className="flex gap-4">
                    <Image className="w-[104px] h-[104px] bg-cover" src={rent.item.imageURL} alt="instrument" height={104} width={104} />
                    <div className="flex flex-col">
                        <h1 className="text-xl">{rent.item.title}</h1>
                        <h2>{formDate(rent.startDate)} to {formDate(rent.endDate)}</h2>
                        <h2>Makati</h2>
                    </div>
                </div>
                <span className="text-primary">₱ {rent.item.pricePerDay} / day</span>
            </div>
            <div className="flex justify-end pt-2">
                <TotalType
                    type={type}
                    startDate={rent.startDate}
                    endDate={rent.endDate}
                    pricePerDay={rent.item.pricePerDay}
                />
            </div>
            <div className="flex justify-end pt-4 pb-2 gap-24">
                <ActionButtons
                    rent={rent}
                    type={type}
                />
            </div>
        </form>
    )
}
