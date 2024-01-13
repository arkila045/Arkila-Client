'use client'
import { IUser } from "@/models/UserModel"
import Image from "next/image"
import { useState } from "react"

interface IProps {
    profile: IUser
}

export default function ChangeImage({ profile }: IProps) {
    const [imageFile, setImageFile] = useState<File>()

    return (
        <div className='flex flex-col items-center w-1/2'>
            <input
                type="file"
                id="imageURL"
                name="imageURL"
                accept="image/png,image/jpeg"
                onChange={(e) => setImageFile(e.target.files?.[0])}
                className="hidden" />
            <div className='flex gap-8 justify-center items-center text-center'>
                <Image
                    className="w-[120px] h-[120px] rounded-full bg-cover"
                    src={imageFile && URL.createObjectURL(imageFile) || profile.imageURL || '/ava.webp'}
                    alt='profile'
                    height={120}
                    width={120} />
            </div>

            <div className='flex gap-8 py-6 justify-center items-center'>
                <button type="button" className='border border-main-blue text-main-blue px-4 py-2 w-fit rounded-md'>
                    <label
                        htmlFor="imageURL"
                        className='py-1 px-2'>
                        Select File
                    </label>
                </button>
            </div>

            <div className='flex gap-8 justify-center items-center'>
                <span className='py-1 px-2 text-gray-400'>File size: maximum 1 MB</span>
            </div>

            <div className='flex gap-8 justify-center items-center'>
                <span className='py-1 px-2 text-gray-400'>File extension: .JPEG, .PNG</span>
            </div>

        </div>
    )
}
