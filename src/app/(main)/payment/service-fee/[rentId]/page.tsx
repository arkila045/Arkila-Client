import { IRent } from "@/models/RentModel"
import Image from "next/image"
import Payment from "../../[rentId]/payment"
import { formDate } from "@/utils/Utils"

interface IProps {
    params: { rentId: string }
}


const getRent = async (rentId: string) => {
    const res = await fetch(`${process.env.API_URI}/api/v1/rent/${rentId}`, {
        cache: 'no-store'
    })
    return res.json()
}

export default async function page({ params }: IProps) {
    const rent: IRent = await getRent(params.rentId)

    return (
        <main className="py-[120px] container mx-auto flex flex-col gap-6">
            <div className="p-4 flex flex-col bg-white border border-gray-100 gap-4">
                <h1 className="text-xl font-medium">Item</h1>
                <div className="border-t border-b border-gray-100 py-2 flex justify-between items-center">
                    <div className="flex gap-4">
                        <Image
                            className="h-[104px] w-[104px]"
                            src={rent.item.imageURL || '/sample_instrument.png'}
                            alt="instrument"
                            height={104}
                            width={104}
                        />

                        <div className="flex flex-col">
                            <h1 className="text-xl">{rent.item.title}</h1>
                            <h2>{formDate(rent.startDate)} to {formDate(rent.endDate)}</h2>
                            <h2>Makati</h2>
                        </div>
                    </div>
                    <span className="text-primary">₱ {rent.item.pricePerDay} / day</span>
                </div>
            </div>

            <Payment
                rent={rent}
                type="service_fee"
            />
        </main>
    )
}
