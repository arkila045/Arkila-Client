import { IUser } from "./UserModel";

export interface IItem {
    _id?: string,
    owner?: IUser,
    title: string,
    pricePerDay?: number,
    location?: string,
    category?: string,
    description: string,
    imageURL: string,
    status?: 'available' | 'not-available'
}