import axiosInstance from "../../baseUrl/baseurl"



export const monitoringData = async () => {
    try {
        const res = await axiosInstance.get(`/admin/rides-monitor/rides`)
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