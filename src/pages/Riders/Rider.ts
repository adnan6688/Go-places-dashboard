import type { TParams } from "../../api/auth.api";
import axiosInstance from "../../baseUrl/baseurl"
export type RiderType = 'standard' | 'assist' | 'wheelchair';

export type RiderUser = {
    _id: string;
    email: string;
    status: 'active' | 'inactive' | 'blocked';
    role: 'rider' | 'admin' | 'staff';
};

export type TRider = {
    _id: string;

    riderId: string;
    fullName: string;
    phone: string;
    address: string;
    county: string;

    pmiNumber: string;

    riderType: RiderType;

    user: RiderUser;

    createdAt: string;
    updatedAt: string;
};






export const allRiders = async (limit?: number, search?: string, status?: string, riderType?: string) => {



    try {
        const params: TParams = {}



        if (limit) {
            params.limit = limit
        }
        if (search) {
            params.search = search
        }
        if (status) {
            params.status = status
        }
        if (riderType) {

            params.riderType = riderType

        }
        const data = await axiosInstance.get(`/admin/riders`, { params })

        return {
            data: data?.data?.data || {}
        }
    }
    catch (err) {
        console.log(err)
    }
}


export const riderDetails = async (id: string) => {
    try {
        const details = await axiosInstance.get(`/admin/riders/${id}`)

        return details?.data?.data || {}
    }
    catch (err) {
        console.log(err)
    }

}