import axiosInstance from "../../baseUrl/baseurl"




export const staffApi = async () => {

    try {
        const res = await axiosInstance.get(`/admin/staffs`)
        console.log("staff", res?.data)
        return []
    } catch (err) {
        console.log(err)
    }
}