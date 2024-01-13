import { cities } from '@/utils/cities'
import { IoCloseSharp } from '@react-icons/all-files/io5/IoCloseSharp'

interface IProps {
    isShow: boolean,
    selected: string | '',
    onChange: (location: string) => void,
    onClose: () => void,
}

export default function LocationModal({ isShow, onClose: close, selected, onChange }: IProps) {
    if (!isShow) return null
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 w-full h-screen z-50 flex justify-center items-center'>
            <form action={(formData: FormData) => {
                onChange(String(formData.get('location')))
                close()
            }} className='bg-white rounded-3xl  w-[480px]'>
                <div className='p-4 flex items-center justify-between border-b border-gray-300'>
                    <h1 className='text-xl font-semibold'>Change location</h1>
                    <button
                        onClick={() => close()}
                        className='bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center'>
                        <IoCloseSharp size={20} />
                    </button>
                </div>
                <div className='p-4 flex flex-col gap-2'>
                    <h2>Select Nearby Location</h2>
                    <select
                        id='location'
                        name='location'
                        defaultValue={selected}
                        className="w-full placeholder:text-[13px] px-4 py-[18px] rounded-xl border border-opacity-30 border-black outline-main-blue">
                        <option value="">Select</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.value}>{city.label}</option>
                        ))}
                    </select>
                </div>
                <div className='p-4 flex justify-end'>
                    <button
                        className='px-4 py-2 bg-primary text-white font-medium rounded-md'>
                        Apply
                    </button>
                </div>
            </form>
        </div>
    )
}
