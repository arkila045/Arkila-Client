import { IChatRoom } from "@/models/ChatRoomModel"
import { IUser } from "@/models/UserModel"
import fetcher from "@/utils/Fetcher"
import SocketIO from "@/utils/SocketIO"
import { defaultRoomName } from "@/utils/Utils"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import useSWR from "swr"

interface IProps {
    onClick: (chatRoom: IChatRoom) => void
}

export default function ConversationList({ onClick }: IProps) {
    const { data: session } = useSession()
    const { data } = useSWR(session ? `${process.env.NEXT_PUBLIC_API_URI}/api/v1/chat/${session?.user._id}` : null, fetcher)
    const [rooms, setRooms] = useState<Array<IChatRoom>>([])

    useEffect(() => {
        data && setRooms(data)
    }, [data])

    useEffect(() => {
        SocketIO.on('updateChatRoom', async (chatRoom: IChatRoom) => {
            const indexToUpdate = await rooms.findIndex(room => room._id === chatRoom._id)
            if (indexToUpdate !== -1) {
                rooms[indexToUpdate] = chatRoom
            }
            else {
                rooms.push(chatRoom)
            }
            rooms.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            setRooms([...rooms])
        })

        return () => {
            SocketIO.off('updateChatRoom')
        }
    }, [rooms])

    return (
        <>
            {rooms && rooms.map((room, index) => (
                <button
                    onClick={() => onClick(room)}
                    key={index}
                    className='flex p-4 gap-4 hover:bg-gray-100 w-full'>
                    <Image
                        className='object-cover h-12 w-12 rounded-full'
                        src={(room.participants[0]._id === session?.user._id ? room.participants[1].imageURL : room.participants[0].imageURL) || '/ava.webp'}
                        alt='user_icon'
                        height={48}
                        width={48} />
                    <div className='text-left'>
                        <h1 className='line-clamp-1 font-medium'>{defaultRoomName(room.participants, session?.user._id)}</h1>
                        <p className='line-clamp-1 font-light text-[15px]'>{room.lastMessage || '...'}</p>
                    </div>
                </button>
            ))}
        </>
    )
}
