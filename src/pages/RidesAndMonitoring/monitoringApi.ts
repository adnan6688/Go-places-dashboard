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





interface Coordinates {
    lat: number;
    lng: number;
}

interface RouteLocation {
    address: string;
    coordinates: Coordinates;
}

interface RouteStop {
    address: string;
    coordinates: Coordinates;
    extraUnitCharged: boolean;
}

interface TRoute {
    distanceMiles: number;
    pickupLocation: RouteLocation;
    dropoffLocation: RouteLocation;
    stops: RouteStop[];
}

export type TDetailsData = {

    driver?: {
        currentLocation: { lng: number, lat: number },
        driverType: string,
        fullName: string,
        licenseStatus: string | null,
        phone: string | null,
        userId: string,
        rating: number,
        vehicle: {
            category: string,
            color: string,
            licensePlate: string,
            model: string,
            totalSeatCount: number,
            year: number
        }

    },
    rider?: {
        fullName: string,
        memberSince: string,
        phone: string,
        totalTrips: number,
        userId: string
    },
    route?: TRoute

}

import axios from "axios";

export const getAddressFromLatLng = async (
    lat: number,
    lng: number
): Promise<string | null> => {

    try {

        const API_KEY = import.meta.env.VITE_GOOGLE_MAP;

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                    latlng: `${lat},${lng}`,
                    key: API_KEY
                }
            }
        );


        if (response.data.status === "OK") {
            return response.data.results[0]?.formatted_address || null;
        }


        return null;


    } catch (error) {

        console.log("Reverse geocoding error:", error);
        return null;

    }
};