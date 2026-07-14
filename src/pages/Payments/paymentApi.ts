import axiosInstance from "../../baseUrl/baseurl"


export type WithdrawalStatus = "PENDING" | "TRANSFERRED" | "REJECTED";

export interface Driver {
    _id: string;
    driverId: string;
    fullName: string;
}

export interface ReviewedBy {
    _id: string;
    email: string;
    role: "admin" | "driver" | "rider" | string;
}

export interface WithdrawalRequest {
    _id: string;

    amount: number;

    driver: Driver;
    driverId: string;

    parentRequest: string;

    status: WithdrawalStatus;

    stripeAccountId: string;
    stripeTransferId: string;

    totalMiles: number;
    tripCount: number;

    requestedAt: string;
    reviewedAt: string;

    createdAt: string;
    updatedAt: string;

    reviewedBy: ReviewedBy;
}


type Tparams = {
    status?: string,
    page?: number,
    tripStatus?: string
}
export const getPaymentList = async (status?: string, page?: number) => {

    try {

        const params: Tparams = {}
        if (status) {
            params.status = status
        }
        if (page) {
            params.page = page
        }

        const result = await axiosInstance.get(`/admin/payments/history`, { params })

        return result?.data
    } catch (er) {
        console.log(er)
    }
}



export const paymentSummary = async () => {

    try {
        const res = await axiosInstance.get('/admin/payments/summary')
        return res?.data?.data || {}
    } catch (er) {
        console.log(er)
    }
}




export const paymentDetailsApi = async (id?: string, page?: number, tripStatus?: string) => {
    try {
        const params: Tparams = {}
        if (page) {
            params.page = page
        }
        if (tripStatus) {
            params.tripStatus = tripStatus
        }
        const res = await axiosInstance.get(`/admin/payments/${id}/details`, { params })

        return res?.data?.data || {}
    }
    catch (err) {
        console.log(err)
    }
}

export const transferAmount = async (paymentRequestId: string, trips: string[]) => {
    try {

        const response = await axiosInstance.post(`admin/payments/${paymentRequestId}/transfer`, {
            tripIds: trips
        });

        return response.data;
    } catch (error) {
        console.error("Error in transferAmount API:", error);
        throw error;
    }
};