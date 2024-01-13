'use client'
import NewListingModal from '@/app/account/listing/items/newListingModal'
import useDropdown from '@/hooks/useDropdown'
import { IItem } from '@/models/ItemModel'
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots'
import React, { useRef, useState } from 'react'

interface IProps {
    item: IItem
}

export default function Option({ item }: IProps) {
    const modal = useRef(null)
    const [toggle, setToggle] = useDropdown(false, modal)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    return (
        <>
            <div className='absolute bottom-0 right-0 p-4'>
                <div className="w-fit h-fit relative">
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setToggle(true)
                        }}>
                        <BsThreeDots size={20} />
                    </button>

                    {toggle && (
                        <div ref={modal} className='bg-white w-[154px] absolute top-5 right-0 drop-shadow-md shadow-md'>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    setShowEditModal(true)
                                    setToggle(false)
                                }}
                                className='p-4 hover:bg-gray-100 w-full text-left'>
                                Edit listing
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                }}
                                className='p-4 hover:bg-gray-100 w-full text-left'>
                                Delete listing
                            </button>
                        </div>
                    )}

                </div>
            </div>


            <NewListingModal
                item={item}
                isModalOpen={showEditModal}
                close={() => setShowEditModal(false)}
            />
        </>
    )
}
