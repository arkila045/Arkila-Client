import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook'
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram'
import { FaTiktok } from '@react-icons/all-files/fa/FaTiktok'
export default function Footer() {
    return (
        <section className='py-[104px] flex flex-col gap-8 bg-white items-center justify-center drop-shadow-sm'>
            <div className='flex gap-10 items-center'>
                <Image className='w-64 h-14' src={'/arkila_logo.png'} alt='logo' width={254} height={56} />
                <Link href={'https://www.facebook.com/arkilaphilippine/'} target='_blank'><FaFacebook size={40} /></Link>
                <Link href={'https://www.instagram.com/arkila_philippines/'} target='_blank'><FaInstagram size={40} /></Link>
                <Link href={'https://www.tiktok.com/@arkila_philippines'} target='_blank'><FaTiktok size={40} /></Link>
            </div>
            <div className='flex gap-10'>
                <Link href={'/'}>FAQs</Link>
                <Link href={'/'}>Terms of Service</Link>
                <Link href={'/guide'}>How does it work</Link>
            </div>
        </section>
    )
}
