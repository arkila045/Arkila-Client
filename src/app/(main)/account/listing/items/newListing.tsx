'use client'
import { FiPlus } from '@react-icons/all-files/fi/FiPlus'
import { useRef, useState } from 'react'
import NewListingModal from './newListingModal'
import { IUser } from '@/models/UserModel'
import { IItem } from '@/models/ItemModel'
import useDropdown from '@/hooks/useDropdown'
import { useSession } from 'next-auth/react'
import { requestUpgrade } from './action'
import { useFormStatus } from 'react-dom'

interface IProps {
    user: IUser,
    items: Array<IItem>
}

const SubmitButton = () => {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending} className='text-white text-xl py-4 w-full bg-primary rounded-md mt-4'>
            {pending ? 'Loading' : 'Upgrade Now'}
        </button>
    )
}

export default function NewListing({ user, items }: IProps) {
    const upgradeModalRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [upgradeModal, setUpgradeModal] = useDropdown(false, upgradeModalRef)
    return (
        <>
            <NewListingModal
                isModalOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
            />

            {upgradeModal && (
                <form action={async (formData: FormData) => {
                    const isSuccess = await requestUpgrade(String(formData.get('userId')))
                    if (isSuccess) setUpgradeModal(false)
                }} className='fixed inset-0 h-screen w-full bg-black bg-opacity-30 z-50 flex justify-center items-center text-center'>
                    <input type="hidden" name="userId" value={user._id} />
                    <div ref={upgradeModalRef} className='bg-white rounded-2xl p-4 w-[617px]'>
                        <h1 className='font-bold text-3xl'>Add more slots</h1>
                        <div className='flex flex-col gap-4 mt-10'>
                            <h2 className='font-bold text-xl'>+3 Slots</h2>
                            <p>Upgrade today to get <span className='font-bold'>3 extra slots</span> for listing more items! Pay a small fee and expand your reach. More slots, more visibility. </p>
                            <h3>Upgrade now and boost your listings!</h3>
                        </div>
                        <h2 className='text-2xl font-bold text-primary mt-8'>₱  999.00</h2>
                        <SubmitButton />
                    </div>
                </form>
            )}


            <button
                onClick={() => {
                    let itemSlots = 3
                    if (user.itemSlots) {
                        itemSlots = user.itemSlots
                    }

                    if (items.length >= itemSlots) {
                        setUpgradeModal(true)
                    }
                    else {
                        setIsModalOpen(true)
                    }
                }}
                className="flex flex-col justify-center items-center overflow-hidden 
                rounded-xl border border-dashed border-black border-opacity-30 hover:shadow-md duration-300 min-h-[392px]">
                <FiPlus />
                <h1>Create new listing</h1>
            </button>
        </>
    )
}
