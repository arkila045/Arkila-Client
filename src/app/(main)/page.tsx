import { Metadata } from "next";
import Carousel from "./carousel";
import TodaysPick from "./todaysPick";
import { IItem } from "@/models/ItemModel";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
    title: 'Arkila'
}

const getItems = async (location: string | any) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/item?${location ? 'location=' + location : ''}&limit=5`)
    return res.json()
}

export default async function page() {
    const session = await getServerSession(authOption)
    const items: Array<IItem> = await getItems(session?.user.address?.city)
    console.log(items)
    return (
        <main className="min-h-screen py-[120px]">
            <Carousel
                items={items}
            />
            <TodaysPick />
        </main>
    )
}
