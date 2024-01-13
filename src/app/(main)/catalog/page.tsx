import ItemCard from '@/components/itemCard/itemCard'
import { categories } from '@/utils/instrumentCategories'
import { IoStar } from '@react-icons/all-files/io5/IoStar'
import { FaLocationDot } from '@react-icons/all-files/fa6/FaLocationDot'
import Link from 'next/link'
import Category from './category'
import Location from './location'
import { IItem } from '@/models/ItemModel'

interface IProps {
    searchParams: { category: string, search: string, location: string }
}

const getItems = async (category: string | any, search: string | any, location: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/item?${search ? 'search=' + search : ''}${location ? '&location=' + location : ''}${category ? '&category=' + category : ''}`)
    return res.json()
}

export default async function page({ searchParams }: IProps) {
    const items: Array<IItem> = await getItems(searchParams.category, searchParams.search, searchParams.location)

    return (
        <main className='py-32 container mx-auto px-5 md:px-0'>
            <section className='flex flex-row gap-8'>
                <div className='flex flex-col gap-4'>
                    <div className='invisible'>empty</div>
                    <div className='flex flex-col gap-4 bg-white p-8'>
                        <span className='flex justify-between items-center'>
                            <h1 className='font-bold'>Filters</h1>
                            <button className='text-main-blue'>Clear</button>
                        </span>

                        <div className='flex flex-col gap-2'>
                            <h2 className='font-medium'>By Category</h2>
                            <Category />
                        </div>

                        <div className='h-0.5 bg-black w-44'></div>

                        <div className='flex flex-col gap-2'>
                            <h2 className='font-medium'>Ratings</h2>
                            <ul className='flex flex-col gap-4'>
                                <li>
                                    <button className='flex gap-1 items-center'>
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                    </button>
                                </li>

                                <li>
                                    <button className='flex gap-1 items-center'>
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <span className='text-[10px]'>And Up</span>
                                    </button>
                                </li>

                                <li>
                                    <button className='flex gap-1 items-center'>
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <span className='text-[10px]'>And Up</span>
                                    </button>
                                </li>

                                <li>
                                    <button className='flex gap-1 items-center'>
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <span className='text-[10px]'>And Up</span>
                                    </button>
                                </li>

                                <li>
                                    <button className='flex gap-1 items-center'>
                                        <IoStar size={18} className='text-yellow-400' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <IoStar size={18} className='text-gray-200' />
                                        <span className='text-[10px]'>And Up</span>
                                    </button>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex justify-between items-center'>
                        {searchParams.search && (
                            <h1>Search result for <span className='text-primary'>‘{searchParams.search}’</span></h1>
                        )}

                        <Location />
                    </div>
                    <div className='p-4 bg-[#EDEDED] flex items-center gap-4'>
                        <h1>Sort by</h1>
                        <button className='px-4 py-2 bg-primary rounded-md text-white'>Relevance</button>
                    </div>
                    <div className='grid grid-cols-5 gap-8'>
                        {/* item card here */}

                        {items.map((item, index) => (
                            <ItemCard
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
