import { IUser } from '@/models/UserModel'
import { IResponsePage } from '@/types/responseType'
import Image from 'next/image'
import { IoMdCheckmark } from '@react-icons/all-files/io/IoMdCheckmark'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { IUpgrade } from '@/models/UpgradeModel'
import { updateStatus } from './action'

interface IProps {
    page: number
}

interface IResponse extends IResponsePage {
    data: Array<IUpgrade>
}

const getUsers = async (page: number) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/upgrade?page=${page}`, {
        cache: 'no-store'
    })
    return res.json()
}
export default async function UserDataRows({ page }: IProps) {
    const result: IResponse = await getUsers(page)

    return (
        result.data.map((upgrade) => (
            <tr key={upgrade._id} className='hover:bg-gray-50'>
                <td className='p-2'>
                    <div className='flex gap-2 items-center'>
                        {upgrade.user?.imageURL && (
                            <Image className='h-10 w-10 rounded-full object-cover' src={upgrade.user.imageURL} alt='user_icon' width={40} height={40} />
                        )}
                        <span className='font-semibold capitalize'>{upgrade.user?.name?.full}</span>
                    </div>
                </td>
                <td className='p-4 truncate capitalize'>{upgrade.details}</td>
                <td className='p-4 truncate'>₱  {upgrade.price}</td>
                <td className='p-4 truncate'>{new Date(upgrade.createdAt).toDateString()}</td>
                <td className='p-4 truncate'>{upgrade.user?.contactNo}</td>
                <td className='p-4 truncate capitalize'>{upgrade.status}</td>
                <td className='p-4 truncate'>
                    <form action={updateStatus} className='flex gap-4'>
                        <input type="hidden" name="upgradeId" value={upgrade._id} />
                        <input type="hidden" name="userId" value={upgrade.user?._id} />
                        {upgrade.status === 'pending' && (
                            <>
                                <button
                                    name='approve'
                                    value={'approve'}
                                    className='font-medium py-2 px-4 bg-[#73C940] text-white rounded-md flex gap-2 hover:bg-green-500 duration-300'>
                                    <IoMdCheckmark size={24} />
                                    Approve
                                </button>
                                <button
                                    name='reject'
                                    value={'reject'}
                                    className='font-medium py-2 px-4 border border-gray-400 rounded-md flex gap-2 text-gray-400 hover:bg-red-500 hover:text-white duration-300'>
                                    <IoMdClose size={24} />
                                    Reject
                                </button>
                            </>
                        )}

                    </form>
                </td>
            </tr>
        ))
    )
}
