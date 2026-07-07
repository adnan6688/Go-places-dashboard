import axiosInstance from "../../baseUrl/baseurl"


type Tparams = {
    limit?: number,
    page?: number,
    status?: string,
    search?: string
}

export const monitoringData = async (page?: number, status?: string, search?: string) => {
    try {
        const params: Tparams = {}

        if (page) {
            params.page = page
        }
        if (status) {
            params.status = status
        }
        if (search) {
            params.search = search
        }

        const res = await axiosInstance.get(`/admin/rides-monitor/rides`, { params })
        return res?.data?.data || {}
    } catch (err) {
        console.log(err)
    }
}

export const monitoringStats = async () => {
    try {
        const result = await axiosInstance.get('/admin/rides-monitor/summary-counts')

        return result?.data?.data || {}
    } catch (err) {
        console.log(err)
    }
}


export const monitoringDetails = async (id: string) => {
    try {
        const res = await axiosInstance.get(`/admin/rides-monitor/rides/${id}`);

        return res?.data?.data || {};

    } catch (err) {
        console.log(err);

        throw err;
    }
};


export type RideStatus =
    | "in-progress"
    | "accepted"
    | "completed"
    | "scheduled"
    | "cancelled"
    | "no_driver_found";


export type RideType =
    | "standard"
    | "assist"
    | "wheelchair"
    | "scheduled"



export interface TRide {

    _id: string;

    rider: {
        name: string;
        riderId: string;
    };

    driver: string;

    route: {
        pickup: string;
        dropoff: string;
    };

    rideType: RideType;

    cost: number;

    status: RideStatus;

    dateTime: string;

}



