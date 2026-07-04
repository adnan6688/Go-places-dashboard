import axiosInstance from "../../baseUrl/baseurl"




export const dispatchRiders = async () => {
    try {
        const res = await axiosInstance.get('/admin/manual-ride/dispatch-riders')
        return res?.data?.data || []
    } catch (error) {
        console.log(error)
    }
}


export const dispatchDrivers = async (riderId: string) => {
    try {
        const res = await axiosInstance.get(`/admin/manual-ride/available-drivers?riderUserId=${riderId}`)

        return res?.data?.data?.drivers || []
    } catch (err) {
        console.log(err)
    }
}




type Coordinates = {
    lat: number;
    lng: number;
};

type Location = {
    address: string;
    coordinates: Coordinates;
};

type Stop = {
    address: string;
    coordinates: Coordinates;
};

export type TRideRequest = {
    driverUserId: string;
    riderUserId: string;
    pickupLocation: Location;
    dropoffLocation: Location;
    stops?: Stop[]; 
    scheduledAt: string;
    notes?: string;
};
export const manualDisptach = async (data : TRideRequest) => {
  
    const result = await axiosInstance.post('/admin/manual-ride/dispatch', data)
    return result
}