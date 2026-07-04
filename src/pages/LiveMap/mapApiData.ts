import axiosInstance from "../../baseUrl/baseurl"



export const liveMapApi = async () => {
    try {
        const res = await axiosInstance.get('/admin/live-map')
        return res?.data?.data || {}
    } catch (err) {
        console.log(err)
    }
}