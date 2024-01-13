'use client'
import { SessionProvider } from "next-auth/react"
interface IProps {
    children: React.ReactNode
}
export default function Provider({ children }: IProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
