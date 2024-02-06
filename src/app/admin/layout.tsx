import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOption } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Navigation from "./navigation"
import Link from "next/link"

interface IProps {
    children: React.ReactNode
}



export default async function layout({ children }: IProps) {
    const session = await getServerSession(authOption)
    if (session?.user.role !== 'admin') redirect('/')
    return (
        <div className="flex w-full h-screen bg-[#F9F9FA]">
            <nav className="h-full min-w-[264px] bg-white drop-shadow-md flex flex-col items-center">
                <Link href={'/'} className="py-6">
                    <Image className="w-[216px] h-12" src={'/arkila_logo.png'} alt="logo" width={216} height={48} />
                </Link>

                <div className="w-full flex flex-col gap-2">
                    <Navigation />
                </div>
            </nav>
            {children}

        </div>
    )
}
