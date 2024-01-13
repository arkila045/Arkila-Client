import { IUser } from './UserModel'

export interface IChatRoom {
    _id?: string,
    participants: Array<IUser>,
    lastMessage: string,
    createdAt: Date,
    updatedAt: Date,
}