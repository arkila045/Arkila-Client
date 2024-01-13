import { IItem } from "./ItemModel";
import { IUser } from "./UserModel";

export interface IRent {
    _id: string,
    renter: IUser,
    item: IItem,
    startDate: Date,
    endDate: Date,
    isItemReceived?: boolean,
    isPaymentReceived?: boolean,
    isItemReturnedRenter?: boolean,
    isItemReturnedOwner?: boolean,
    isPaidServiceFee?: boolean
}