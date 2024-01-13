import { IUser } from "@/models/UserModel"

export const defaultRoomName = (participants: Array<IUser>, sessionUserId: string | any) => {
    let result = ''
    participants.slice(0, 3).map(participant => {
        if (participant._id !== sessionUserId) result += participant.username + ', '
    })
    return result.slice(0, -2)
}

export const formDate = (date: Date) => {
    const utcDate = new Date(date)
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(utcDate);
    return formattedDate
}

export const getPrice = (a: Date | any, b: Date | any, pricePerDay: number | any) => {
    if (!a || !b || !pricePerDay) return 0
    a = new Date(a)
    b = new Date(b)
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const totalPrice = Math.floor((utc2 - utc1) / _MS_PER_DAY) * pricePerDay
    if (totalPrice <= 0) return 0
    return totalPrice;
}