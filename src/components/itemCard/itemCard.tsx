import { HiMapPin } from "@react-icons/all-files/hi2/HiMapPin";
import Image from "next/image";
import Link from "next/link";
import Option from "./option";
import { IItem } from "@/models/ItemModel";

interface IProps {
    item: IItem,
    editMode?: boolean
}
export default function ItemCard({ item, editMode }: IProps) {
    return (
        <div className="relative rounded-xl border border-main-black border-opacity-30 hover:shadow-md duration-300 bg-white min-h-[392px]">
            <Link href={`/item/${item._id}`} className="absolute w-full h-full">
                <Image
                    className="w-full h-[240px] bg-cover rounded-t-xl"
                    src={item.imageURL}
                    alt="instrument"
                    height={240}
                    width={240}
                />

                <div className="p-4">
                    <h1 className="text-xl">{item.title}</h1>
                    <h2 className="text-primary mt-2">₱ {item.pricePerDay} / days</h2>
                    <h3 className='flex items-center gap-2 text-xs capitalize'><HiMapPin className='text-main-black' size={24} /> {item.location}</h3>

                </div>
            </Link>
            {editMode && (
                <Option
                    item={item}
                />
            )}
        </div >
    )
}
