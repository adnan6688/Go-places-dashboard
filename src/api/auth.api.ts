import axiosInstance from "../baseUrl/baseurl";

type LoginData = {
    email: string;
    password: string;
};
export const loginApi = async (data: LoginData) => {
    return await axiosInstance.post("/auth/admin/login", data);
};


export const logOutFromSite = async () => {
    return await axiosInstance.post('/auth/logout')
}





export const ridesOverView = async (year?: number) => {
    const res = await axiosInstance.get(`/admin/reports/monthly-rides?year=${year}`);
    return res?.data?.data || [];
};



export const dashboardOverView = async () => {
    const res = await axiosInstance.get('/admin/dashboard/summary')

    return res.data?.data || {}
}


export type TActivity = {
    _id: string;
    actor: {
        _id: string;
    };
    action: string;
    targetType: "DRIVER" | "RIDER";
    target: string;
    title: string;
    description: string;
    metadata: {
        driverName?: string;
        driverCustomId?: string;
        riderName?: string;
        riderCustomId?: string;
    };
    createdAt: string;
    updatedAt: string;
};
export const recentActivity = async () => {
    const res = await axiosInstance.get('/admin/dashboard/recent-activity')
    return res?.data?.data || {}
}


export const revenueChartApi = async () => {

    const res = await axiosInstance.get('/admin/dashboard/revenue-trend')
    return res?.data?.data || {}
}


export type TParams = {
    page?: number,
    search?: string,
    limit ? : number,
    status?: string,
    docsStatus?: string,
    riderType? : string
}
export type TDriver = {
    _id: string,
    fullName: string,
    registeredDate: string,
    licenseNumber: string,
    phone: string,
    status: string,
    dotExpiration: string,
    docsStatus: string
}

export const allDrivers = async (page?: number, search?: string, status?: string, docsStatus?: string) => {

    const params: TParams = {};

    if (page) {
        params.page = Number(page);
    }
    if (search) {
        params.search = search
    }
    if (status) {
        params.status = status
    }
    if (docsStatus) {
        params.docsStatus = docsStatus
    }

    const res = await axiosInstance.get('/admin/drivers', { params });
    return res?.data?.data
}

export interface TDocumentFile {
  _id: string;
  category: string;
  title: string;
  url: string;
  public_id: string;
  status: "verified" | "pending" | "expired";
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
}
export const driverDetailsApi = async (id: string) => {

    try {
        const data = await axiosInstance.get(`/admin/drivers/${id}`);
        return data?.data?.data;
    } catch (error) {
        console.error("Failed to fetch driver:", error);
        return {};
    }
}