import { IUser } from './UserModel';

export interface IChatMessage {
    chatRoomId: string | any,
    sender: IUser,
    content: string
}