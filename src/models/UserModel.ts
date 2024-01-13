export interface IUser {
    _id?: string,
    email?: string,
    name?: {
        first: string,
        last: string,
        full: string
    },
    address?: {
        firstLine: string,
        barangay: string,
        city: string,
        full: string
    },
    imageURL?: string,
    username?: string,
    contactNo?: string,
    password?: string
    role?: string,
    accountType?: string,
    socket: Array<string>,
    itemSlots?: number
}
