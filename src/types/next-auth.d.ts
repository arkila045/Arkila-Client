import { IUser } from '@/models/UserModel';
import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: IUser,
    }

    interface User extends IUser { }
}


declare module "next-auth/jwt" {
    interface JWT {
        user: IUser
    }
}
