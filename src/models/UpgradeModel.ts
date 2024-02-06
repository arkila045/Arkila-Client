import { IUser } from "./UserModel";

export interface IUpgrade {
    _id?: string,
    user?: IUser,
    details?: string,
    price?: number,
    status: 'pending' | 'approved' | 'rejected',
    createdAt: Date,
}