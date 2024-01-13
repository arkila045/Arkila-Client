import { IItem } from '@/models/ItemModel'
import { useCallback, useState } from 'react'
import StepOne from './stepOne'
import StepTwo from './stepTwo'
import StepThree from './stepThree'
import { addItem, editItem } from './action'

interface IProps {
    item?: IItem,
    isModalOpen: boolean,
    close: () => void
}

export default function NewListingModal({ isModalOpen, close, item: currentItem }: IProps) {
    const [step, setStep] = useState<number>(0)
    const [item, setItem] = useState<IItem>({
        title: currentItem?.title || '',
        description: currentItem?.description || '',
        imageURL: currentItem?.imageURL || '',
        pricePerDay: currentItem?.pricePerDay || undefined,
        location: currentItem?.location || '',
        category: currentItem?.category || ''
    })

    const handleSubmit = useCallback(async () => {
        if (currentItem) {
            await editItem(currentItem._id, item)
        }
        else {
            await addItem(item)
        }
        close()
    }, [item])


    if (!isModalOpen) return

    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full z-[99] flex items-center justify-center">
            <section className="bg-white p-4 rounded-3xl flex flex-col w-full max-w-[480px]">
                <h1 className="font-semibold text-xl">Item listing</h1>
                {step === 0 && (
                    <StepOne
                        imageURL={currentItem?.imageURL}
                        setImageURL={(url) => setItem({ ...item, imageURL: url })}
                        nextStep={() => setStep(currStep => currStep + 1)}
                        close={() => close()}
                    />
                )}

                {step === 1 && (
                    <StepTwo
                        item={currentItem}
                        nextStep={() => setStep(currStep => currStep + 1)}
                        stepTwoData={(data) => setItem({ ...item, ...data })}
                        close={() => close()}
                    />
                )}

                {step === 2 && (
                    <StepThree
                        description={currentItem?.description}
                        setDescription={(desc) => setItem({ ...item, description: desc })}
                        submit={handleSubmit}
                        close={() => close()}
                    />
                )}
            </section>
        </div>
    )
}
