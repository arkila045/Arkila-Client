import { IChatMessage } from "@/models/ChatMessageModel"
import { IChatRoom } from "@/models/ChatRoomModel"
import fetcher from "@/utils/Fetcher"
import SocketIO from "@/utils/SocketIO"
import { VscSend } from "@react-icons/all-files/vsc/VscSend"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import useSWR from "swr"

interface IProps {
    chatRoom: IChatRoom
}

export default function Conversation({ chatRoom }: IProps) {
    const { data: fetchMessages, isLoading } = useSWR(() => `${process.env.NEXT_PUBLIC_API_URI}/api/v1/chat/conversation/${chatRoom._id}`, fetcher, {
        revalidateOnFocus: false
    })
    const messageList = useRef<HTMLDivElement>(null)
    const { data, status } = useSession()
    const [content, setContent] = useState<string>('')
    const [messages, setMessages] = useState<Array<IChatMessage>>([])
    useEffect(() => {
        SocketIO.on('receiveMessage', (message: IChatMessage) => {
            if (message.chatRoomId === chatRoom._id) setMessages(prevMessages => [...prevMessages, message])
        })
        return () => {
            SocketIO.off('receiveMessage')
        }
    }, [])

    useEffect(() => {
        messageList.current?.scrollIntoView({ behavior: 'instant', block: 'end' })
    }, [chatRoom])

    useEffect(() => {
        fetchMessages && setMessages(fetchMessages)
    }, [fetchMessages])

    const sendMessage = () => {
        if (status !== 'authenticated') return
        if (!content.trim()) return
        const message = {
            sender: data.user,
            chatRoomId: chatRoom._id,
            content
        }
        setMessages([...messages, message])
        setContent('')
        SocketIO.emit('sendMessage', { ...message, sender: data.user._id })
    }
    if (isLoading) return 'Loading'
    return (
        <div className='bg-white flex flex-col overflow-hidden h-full'>
            <div className='flex flex-grow-0 flex-col-reverse overflow-y-auto h-full'>
                <div ref={messageList} className='px-4 py-2 flex flex-col gap-5'>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className='flex gap-4 w-full'>
                            <Image className='object-cover h-12 w-12 rounded-full' src={message.sender.imageURL || '/ava.webp'} alt='user_icon' height={48} width={48} />
                            <div className='text-left'>
                                <h1 className='line-clamp-1 font-semibold'>{message.sender.username}</h1>
                                <p className='text-[15px] text-black'>{message.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className='flex h-fit gap-2 items-center px-4 py-2'>
                <input
                    onKeyDown={(e) => e.code === 'Enter' && sendMessage()}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className='w-full rounded-3xl px-4 py-[10px] bg-gray-200'
                    type="text"
                    id="message"
                    placeholder='Message' />
                <button className='text-main-blue'><VscSend size={30} /></button>
            </div>
        </div>
    )
}
