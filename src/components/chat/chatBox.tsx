import { TbMessageCirclePlus } from '@react-icons/all-files/tb/TbMessageCirclePlus'
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose'
import { useEffect, useState } from 'react'
import NewChat from './newChat'
import { IChatRoom } from '@/models/ChatRoomModel'
import Conversation from './conversation'
import { useSession } from 'next-auth/react'
import ConversationList from './conversationList'
interface IProps {
    isChatOpen: boolean,
    onClose: () => void
}

export default function ChatBox({ isChatOpen, onClose: close }: IProps) {
    const { data } = useSession()
    const [chatRoom, setChatRoom] = useState<IChatRoom | null>(null)
    
    //for one to one conversation only
    const receiver = chatRoom?.participants[0]._id !== data?.user._id ? chatRoom?.participants[0] : chatRoom?.participants[1]

    if (!isChatOpen) return null
    return (
        <div className="fixed bottom-0 right-6 z-50 bg-white flex h-[556px] drop-shadow-lg shadow-md rounded-t-xl border">

            <div className="flex flex-col min-w-[296px] max-w-[296px] border-r">
                <div className="flex justify-between p-4 border-b-2">
                    <h1 className='text-2xl font-bold'>Chats</h1>
                    <button
                        onClick={() => setChatRoom(null)}
                        className='text-main-black'>
                        <TbMessageCirclePlus size={25} />
                    </button>
                </div>

                <div className='overflow-auto'>
                    <ConversationList
                        onClick={(room) => setChatRoom(room)}
                    />
                </div>
            </div>

            <div className='flex flex-col min-w-[480px] max-w-[480px] '>
                <div className='px-4 p-2 border-b flex justify-between items-center bg-white'>
                    <h1 className='font-bold'>{chatRoom ? receiver?.username : 'New Chat'}</h1>
                    <button onClick={() => close()}><IoMdClose size={20} /></button>
                </div>
                {chatRoom ? (<Conversation chatRoom={chatRoom} />) : (<NewChat onSelect={(room) => setChatRoom(room)} />)}
            </div>
        </div>
    )
}
