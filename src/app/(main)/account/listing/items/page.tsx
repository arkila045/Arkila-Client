import ItemCard from '@/components/itemCard/itemCard'
import NewListing from './newListing'
import { getServerSession } from 'next-auth'
import { authOption } from '@/app/api/auth/[...nextauth]/route'
import { IItem } from '@/models/ItemModel'
import { IUser } from '@/models/UserModel'

const getItems = async (userId: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/item?userId=${userId}`)
    return res.json()
}

const getUser = async (userId: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/user/${userId}`)
    return res.json()
}

export default async function page() {
    const session = await getServerSession(authOption)
    const items: Array<IItem> = await getItems(session?.user._id)
    const user: IUser = await getItems(session?.user._id)
    return (
        <section className='mt-3'>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8'>
                {items.map((item, index) => (
                    <ItemCard
                        key={index}
                        item={item}
                        editMode={true}
                    />
                ))}
                <NewListing
                    user={user}
                    items={items}
                />
            </div>
        </section>
    )
}
