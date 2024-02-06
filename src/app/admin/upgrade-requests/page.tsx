import Link from 'next/link'
import UserDataRows from './userDataRows'

interface IProps {
    searchParams: { page: number }
}
export default function page({ searchParams }: IProps) {
    const page = searchParams.page || 1

    return (
        <main className='w-full py-6 px-8'>
            <div className='bg-white min-h-[500px] w-full drop-shadow-sm'>
                <table className='w-full'>
                    <thead className='border-b'>
                        <tr className=''>
                            <th className='p-4 font-normal text-left'>User</th>
                            <th className='p-4 font-normal text-left'>Details</th>
                            <th className='p-4 font-normal text-left'>Price</th>
                            <th className='p-4 font-normal text-left'>Date requested</th>
                            <th className='p-4 font-normal text-left'>Contact No.</th>
                            <th className='p-4 font-normal text-left'>Status</th>
                            <th className='p-4 font-normal text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserDataRows
                            page={page}
                        />
                    </tbody>
                </table>
            </div>

            <div className='flex gap-4 text-lg text-main-blue justify-end mt-2'>
                <Link href={'/admin/upgrade-requests?page=' + String(page > 1 ? page - 1 : 1)}>Previous</Link>
                <Link href={'/admin/upgrade-requests?page=' + (Number(page) + 1)}>Next</Link>
            </div>
        </main>
    )
}
