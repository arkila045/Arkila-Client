import { io } from 'socket.io-client'

const SocketIO = io(`${process.env.NEXT_PUBLIC_API_URI}`, {
    autoConnect: false
})

export default SocketIO