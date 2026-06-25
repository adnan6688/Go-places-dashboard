import axiosInstance from "../../baseUrl/baseurl"




export const reportsSummary = async () => {
    try {
        const res = await axiosInstance.get('/admin/reports/summary')
        return res?.data?.data || {}
    } catch (err: any) {
        throw new Error(err)
    }
}


export const monthlyRiders = async (year?: string) => {

    try {
        const params: { year?: string } = {}
        if (year) {
            params.year = year
        }
        const result = await axiosInstance.get('/admin/reports/monthly-rides', { params })

        return result?.data?.data || []
    } catch (err: any) {
        throw new Error(err)
    }
}


export const RidesTypeAp = async () => {

    try {
        const res = await axiosInstance.get('/admin/reports/riders-by-type')

        return res?.data?.data || {}
    } catch (err: any) {
        throw new Error(err)
    }
}