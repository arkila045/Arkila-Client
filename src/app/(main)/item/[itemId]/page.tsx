import Image from "next/image"
import { HiOutlineMapPin } from "@react-icons/all-files/hi2/HiOutlineMapPin";
import { IItem } from "@/models/ItemModel";
import Request from "./request";
import { IRent } from "@/models/RentModel";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

interface IProps {
    params: { itemId: string }
}

const getItem = async (itemId: string) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/item/${itemId}`, { cache: 'no-cache' })
    return res.json()
}

const getRent = async (itemId: string) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/rent/item/${itemId}`, { cache: 'no-cache' })
    return res.json()
}

export default async function page({ params }: IProps) {
    const session = await getServerSession(authOption)
    const item: IItem = await getItem(params.itemId)
    const rents: Array<IRent> = await getRent(params.itemId)
    return (
        <main className="py-24">
            <section className="bg-white py-6">
                <div className="container mx-auto flex flex-col md:flex-row gap-8">
                    <Image className="h-[784px] w-[784px] object-cover" src={item.imageURL} alt='instrument' height={784} width={784} />
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <h1 className="font-bold text-5xl">{item.title}</h1>
                            <div className="flex gap-4">
                                <span className="after:border after:ml-4 flex items-center gap-2 capitalize"><HiOutlineMapPin /> {item.owner?.address?.city}</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex gap-2 after:border after:ml-2">
                                    <Image className="h-6 w-6 rounded-full bg-cover" src={item.owner?.imageURL || '/ava.webp'} alt="profile" height={24} width={24} />
                                    <h1 className="capitalize">{item.owner?.name?.full}</h1>
                                </div>
                                <span className="after:border after:ml-4 capitalize">{item.owner?.address?.full}</span>
                                <span>{item.owner?.contactNo}</span>
                            </div>
                        </div>
                        <div className="p-4 bg-[#FAFAFA]">
                            <h1 className="font-bold text-primary text-3xl">₱ {item.pricePerDay} / day</h1>
                        </div>
                        <p className="text-justify">{item.description}</p>
                        <Request
                            itemId={item._id}
                            pricePerDay={item.pricePerDay}
                            rents={rents || []}
                        />
                    </div>
                </div>
                
            </section>


        </main>
    )
}
