
import type { QueryObserverResult } from "@tanstack/react-query";


export interface IUser {

    _id: string,
    user: {
        _id: string,
        email: string,
        role: 'admin' | 'staff',
        status: string
    },
    fullName: string,
    phone: string,
    createdAt: Date,
    updatedAt: Date,
    __v?: number

}


export interface IValue {
    user: IUser | null;
    loading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refetchUser: () => Promise<QueryObserverResult<any, Error>>;


}