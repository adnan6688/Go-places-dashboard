import axiosInstance from "../../baseUrl/baseurl"

export type ActivityLog = {
    _id: string;

    actor: {
        _id: string;
        email: string;
        role: string;
        fullName: string;
    };

    action: string;
    targetType: string;
    target: string;

    title: string;
    description: string;

    metadata?: {
        staffEmail?: string;
        [key: string]: any;
    };

    createdAt: string;
    updatedAt: string;
};



export const activityData = async (page?: number, search?: string, targetType?: string, startDate?: string) => {
    try {
        const params: { page?: number, search?: string, targetType?: string, startDate?: string } = {}
        if (page) {
            params.page = page
        }
        if (page) {
            params.search = search
        }
        if (targetType) {
            params.targetType = targetType
        }
        if (startDate) {
            params.startDate = startDate

        }

        const data = await axiosInstance.get(`/admin/activity-log`, { params })
        return data?.data || []
    } catch (err) {
        console.log(err)
    }
}