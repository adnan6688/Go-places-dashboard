import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Hook/useAuth";
import GlobalLoading from "../Loading/Loading";

type Props = {
    children: React.ReactNode;
};

export default function PrivetRoutes({ children }: Props) {
    const { loading, user } = useAuth();
    const location = useLocation();


    if (loading) {

        return <div className="flex justify-center items-center ">
            <GlobalLoading></GlobalLoading>
        </div>;
    }


    if (!user) {
        return (
            <Navigate
                to="/"
                state={{ from: location }}
                replace
            />
        );
    }

    if (user?.user?.role !== "admin" && user?.user?.role !== "staff") {
        return <Navigate to="/" />;
    }
    return children;
}