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
  const res = await axiosInstance.get(`/admin/reports/monthly-rides?year=${year}` );
  return res?.data?.data || [];
};



export const dashboardOverView = async ()=>{
    const res = await axiosInstance.get('/admin/dashboard/summary')

    return res.data?.data || {}
}