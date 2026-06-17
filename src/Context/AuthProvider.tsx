import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../baseUrl/baseurl";
import type { IValue } from "./userType";
import { AuthContext } from "./AuthContext";





interface Props {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const res = await axiosInstance.get("/admin/me");
            return res.data.data;
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    });



    const value: IValue = {
        user: data ?? null,
        loading: isLoading,
        refetchUser: refetch,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;