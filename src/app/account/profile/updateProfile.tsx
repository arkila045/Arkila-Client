import React from 'react'
import ChangeImage from './changeImage'
import { updateProfile } from './action'
import { IUser } from '@/models/UserModel'
import { cities } from '@/utils/cities'


interface IProps {
    profile: IUser
}

export default function UpdateProfile({ profile }: IProps) {
    return (
        <form action={updateProfile} className='flex'>
            <div className='flex flex-col w-1/2 gap-8 border-r border-gray-200 px-8 py-2'>
                <div className='flex gap-8 items-center justify-center'>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        name='firstName'
                        id='firstName'
                        defaultValue={profile.name?.first}
                        type="text"
                        className='p-4 w-full rounded-xl border border-gray-300 capitalize'
                        placeholder="First Name" />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        name='lastName'
                        id='lastName'
                        defaultValue={profile.name?.last}
                        type="text"
                        className='p-4 w-full rounded-xl border border-gray-300 capitalize'
                        placeholder="Last Name" />
                </div>

                <div className='flex gap-4 items-center justify-center'>
                    <label htmlFor="address">Address</label>
                    <input
                        id='firstLine'
                        name='firstLine'
                        defaultValue={profile.address?.firstLine}
                        type="text"
                        className='p-4 w-full rounded-xl border border-gray-300'
                        placeholder="Address" />
                </div>

                <div className='flex gap-4 items-center justify-center'>
                    <label htmlFor="address">Barangay</label>
                    <input
                        id='barangay'
                        name='barangay'
                        defaultValue={profile.address?.barangay}
                        type="text"
                        className='p-4 w-full rounded-xl border border-gray-300'
                        placeholder="Address" />
                </div>

                <div className='flex gap-4 items-center justify-center'>
                    <label htmlFor="address">City</label>
                    <select
                        id='city'
                        name='city'
                        defaultValue={profile.address?.city}
                        className="w-full placeholder:text-[13px] px-4 py-[18px] rounded-xl border border-opacity-30 border-black outline-main-blue">
                        <option value="">Select</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.value}>{city.label}</option>
                        ))}
                    </select>
                </div>

                {/* <div className='flex gap-10 items-center'>
                    <h1>Email</h1>
                    <h2 className='flex gap-4 text-gray-400'>{profile.email}<button className='underline text-main-blue'>Change</button></h2>
                </div>

                <div className='flex gap-6 items-center'>
                    <h1>Contact</h1>
                    <h2 className='flex gap-4 text-gray-400'>{profile.contactNo}<button className='underline text-main-blue'>Change</button></h2>
                </div> */}

                <div className='flex gap-8 justify-center items-center'>
                    <button className='bg-primary text-white px-4 py-2 w-fit rounded-md'>
                        <span className='py-1 px-2'>Save</span>
                    </button>
                </div>

            </div>
            <ChangeImage
                profile={profile}
            />
        </form>
    )
}
