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