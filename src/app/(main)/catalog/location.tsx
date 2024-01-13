'use client'
import { FaLocationDot } from '@react-icons/all-files/fa6/FaLocationDot'
import LocationModal from './locationModal'
import { useCallback, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


export default function Location() {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedLocation, setSelectedLocation] = useState<string>(searchParams.get('location') || '')


    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (!value) {
                params.delete(name)
                return params.toString()
            }
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className='flex items-center gap-2 text-main-blue capitalize'><FaLocationDot className='text-primary' />
                {selectedLocation === '' ? 'Select location' : selectedLocation}
            </button>

            <LocationModal
                isShow={showModal}
                selected={selectedLocation}
                onChange={(location) => {
                    setSelectedLocation(location)
                    router.push(pathName + '?' + createQueryString('location', location))
                }}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}
