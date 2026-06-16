import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://come-nanny-theme.ngrok-free.dev/api/v1",
    withCredentials: true
});

export default axiosInstance;