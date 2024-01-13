import { getServerSession } from "next-auth"
import UpdateProfile from "./updateProfile"
import { authOption } from "@/app/api/auth/[...nextauth]/route"

const getProfile = async (userId: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/user/${userId}`)
    return res.json()
}

export default async function page() {
    const session = await getServerSession(authOption)
    const profile = await getProfile(session?.user._id)
    return (
        <section className='w-full bg-white p-8'>
            <div className='flex flex-col gap-2'>
                <h1 className='font-black'>Profile</h1>
                <h2>Manage and protect your account</h2>
            </div>
            <div className='w-full h-0.5 bg-gray-200 my-8'></div>
            <UpdateProfile
                profile={profile}
            />
        </section>
    )
}
