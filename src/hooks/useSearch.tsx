import { useEffect, useState } from "react"

export default function useSearch(search: string) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>([])

    useEffect(() => {
        setIsLoading(true)
        const searchTimeout = setTimeout(async () => {
            if (!search) {
                setData([])
                setIsLoading(false)
                return
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/v1/user?search=${search}`)
            const data = await res.json()
            setIsLoading(false)
            if (!res.ok) setData([])
            setData(data)
        }, 1000)

        return () => {
            clearTimeout(searchTimeout)
        }
    }, [search])

    return { data, isLoading }
}
