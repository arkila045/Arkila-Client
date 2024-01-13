'use client'
import { TbMessageCircle } from '@react-icons/all-files/tb/TbMessageCircle'
import ChatBox from './chatBox'
import { useEffect, useState } from 'react'
import SocketIO from '@/utils/SocketIO'
import { useSession } from 'next-auth/react'

export default function Chat() {
    const { status, data } = useSession()
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

    useEffect(() => {
        if (status !== 'authenticated') return
        SocketIO.connect()
        SocketIO.on('connect', () => {
            SocketIO.emit('saveSocket', data.user._id)
        })

        return () => {
            SocketIO.off('connect')
            SocketIO.disconnect()
        }

    }, [status])

    return (
        <section className='relative z-50'>
            {status === 'authenticated' && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className='fixed bottom-6 right-6 flex items-center gap-2 p-4 bg-primary rounded-full text-white font-medium'><TbMessageCircle size={24} />
                    Chat
                </button>
            )}


            <ChatBox
                isChatOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
            />
        </section>
    )
}
