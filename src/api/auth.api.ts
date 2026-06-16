import axiosInstance from "../baseUrl/baseurl";

type LoginData = {
    email: string;
    password: string;
};
export const loginApi = (data: LoginData) => {
    return axiosInstance.post("/auth/admin/login", data);
};