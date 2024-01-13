import useSearch from "@/hooks/useSearch"
import { IChatRoom } from "@/models/ChatRoomModel"
import { IUser } from "@/models/UserModel"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useCallback, useState } from "react"

interface IProps {
    onSelect: (chatRoom: IChatRoom) => void
}

export default function NewChat({ onSelect }: IProps) {
    const { data: session } = useSession()
    const [isChatRoomLoading, setIsChatRoomLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const { data, isLoading }: { data: Array<IUser>, isLoading: boolean } = useSearch(search)

    const setChatRoom = useCallback(async (selectedId: string | undefined) => {
        setIsChatRoomLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/v1/chat/${session?.user._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: selectedId
            })
        })
        const data = await res.json()
        setIsChatRoomLoading(false)
        if (!res.ok) throw new Error(data.message)
        onSelect(data)
    }, [])


    if (isChatRoomLoading) {
        return (
            <h1 className="text-center w-full">Loading...</h1>
        )
    }

    return (
        <div className='bg-slate-100 h-full overflow-auto'>
            <div className='w-full p-3'>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    className='h-16 w-full border-2 border-main-black rounded-lg px-4 py-[22px]'
                    type="text"
                    id="username"
                    placeholder='Search username' />
            </div>
            {isLoading ? <h1 className="text-center w-full">Loading...</h1> :
                data.map((user, index) => (
                    <button
                        onClick={() => setChatRoom(user._id)}
                        key={index}
                        className='flex p-4 gap-4 hover:bg-gray-300 w-full items-center'>
                        <Image className='object-cover h-12 w-12 rounded-full' src={'/ava.webp'} alt='user_icon' height={48} width={48} />
                        <div className='text-left'>
                            <h1 className='line-clamp-1 font-medium'>{user.username}</h1>
                        </div>
                    </button>
                ))
            }
        </div>
    )
}
