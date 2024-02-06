import Image from "next/image"
export default function page() {
    return (
        <section className='w-full bg-white p-8'>
            <div className='flex flex-col gap-2'>
                <h1 className='font-medium'>Profile</h1>
                <h2>Manage and protect your account</h2>
            </div>
            <div className='w-full h-0.5 bg-gray-200 my-8'></div>
            <div className='flex'>
                <div className='flex flex-col gap-8 border-r border-gray-200 px-8 py-2'>
                    <div className='flex gap-8 items-center'>
                        <label htmlFor="">Name</label>
                        <input type="text" className='p-4 rounded-xl border border-gray-300' />
                    </div>

                    <div className='flex gap-8 items-center'>
                        <h1>Email</h1>
                        <h2 className='flex gap-4 text-gray-400'>Step**********@gmail.com<button className='underline text-main-blue'>Change</button></h2>
                    </div>

                    <div className='flex gap-8 items-center'>
                        <h1>Contact</h1>
                        <h2 className='flex gap-4 text-gray-400'>***********62<button className='underline text-main-blue'>Change</button></h2>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <Image className="w-[120px] h-[120px] rounded-full bg-cover" src={'/ava.webp'} alt='profile' height={120} width={120} />

                </div>
            </div>
        </section>
    )
}
