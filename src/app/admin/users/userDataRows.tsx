import { IUser } from '@/models/UserModel'
import { IResponsePage } from '@/types/responseType'
import Image from 'next/image'

interface IProps {
    page: number
}

interface IResponse extends IResponsePage {
    data: Array<IUser>
}

const getUsers = async (page: number) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/user/all?page=${page}`, {
        cache: 'no-store'
    })
    return res.json()
}
export default async function UserDataRows({ page }: IProps) {
    const result: IResponse = await getUsers(page)

    return (
        result.data.map((user) => (
            <tr key={user._id} className='hover:bg-gray-50'>
                <td className='p-4 truncate'>{user?.createdAt?.toDateString() || 'N/A'}</td>
                <td className='p-2'>
                    <div className='flex gap-2 items-center'>
                        {user.imageURL && (
                            <Image className='h-10 w-10 rounded-full object-cover' src={user.imageURL} alt='user_icon' width={40} height={40} />
                        )}
                        <span className='font-semibold capitalize'>{user.name?.full}</span>
                    </div>
                </td>
                <td className='p-4 truncate'>{user.email}</td>
                <td className='p-4 truncate'>{user.contactNo}</td>
                <td className='p-4 truncate capitalize'>{user.address?.full}</td>
                <td className='p-4 truncate capitalize'>{user.qa_work || 'N/A'}</td>
                <td className='p-4 truncate capitalize'>{user.qa_role || 'N/A'}</td>
            </tr>
        ))
    )
}
