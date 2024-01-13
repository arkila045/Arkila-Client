

interface IProps {
    label?: string,
    id: string,
    type: string,
    defaultValue?: string | any,
    placeholder: string,
    error?: string | null
}

export default function InputBox({ id, label, placeholder, type, error, defaultValue }: IProps) {
    return (
        <div className="flex flex-col w-full gap-2 relative">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                name={id}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full placeholder:text-[13px] px-4 py-[18px] rounded-xl border border-opacity-30 border-black outline-main-blue" />
            {error && (
                <label htmlFor={id} className="text-xs text-red-600">{error}</label>
            )}
        </div>
    )
}
