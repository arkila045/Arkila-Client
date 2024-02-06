import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

interface IProps {
    children: React.ReactNode
}
export default function layout({ children }: IProps) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
