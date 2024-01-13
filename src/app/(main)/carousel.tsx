'use client'
import { EffectCards, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiMapPin } from '@react-icons/all-files/hi2/HiMapPin'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination'
import Image from 'next/image';
import { IItem } from '@/models/ItemModel';
import { useState } from 'react';
import Link from 'next/link';

interface IProps {
    items: Array<IItem>
}
export default function Carousel({ items }: IProps) {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    return (
        <section className="bg-white flex drop-shadow-sm py-8 overflow-hidden">
            <div className="container mx-auto text-main-black-100 flex flex-col lg:flex-row px-5 md:px-0 justify-between gap-40">
                <div className="w-full flex flex-col justify-between">
                    <div>
                        <h1 className="font-bold text-3xl">TOP <span className="text-primary">RENTED</span> ITEMS</h1>
                        <div className="mt-[6px]">
                            <h1 className="font-bold text-5xl leading-relaxed capitalize">{items[currentSlide]?.title}</h1>
                            <h2 className='flex items-center gap-2 text-xs capitalize'><HiMapPin className='text-main-black' size={24} /> {items[currentSlide]?.owner?.address?.city}</h2>
                            <p className='mt-2'>
                                {items[currentSlide]?.description}
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                                <Link
                                    href={'/item/' + items[currentSlide]?._id}
                                    className="px-8 py-2 text-white bg-primary rounded-xl font-semibold text-2xl hover:bg-red-800 duration-300">
                                    RENT NOW
                                </Link>
                                <h2 className="text-xl text-primary">₱ {items[currentSlide]?.pricePerDay} / day</h2>
                            </div>
                        </div>
                    </div>

                    <div id='pagination' className='flex justify-center gap-2'>

                    </div>
                </div>

                <div className="w-full ">
                    <Swiper
                        onActiveIndexChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards, Pagination]}
                        loop={true}
                        className='w-[312px] sm:w-[412px] lg:w-[462px] xl:w-[512px] duration-300'
                        pagination={{
                            el: '#pagination',
                            type: 'bullets',
                            bulletClass: 'bullet',
                            bulletActiveClass: 'bullet-active',
                            clickable: true
                        }}
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index} className='rounded-lg drop-shadow-md'>
                                <Image className='object-cover w-[512px] h-[512px]' src={item.imageURL || '/sample_instrument.png'} alt='instrument' height={512} width={512} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
