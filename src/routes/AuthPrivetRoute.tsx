import type React from "react";
import { useAuth } from "../Hook/useAuth";
import { Navigate, useLocation } from "react-router";
import GlobalLoading from "../Loading/Loading";

type Props = {
    children: React.ReactNode;
};



export default function AuthPrivetRoute({ children }: Props) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <GlobalLoading />
            </div>
        );
    }

    const authRoutes = ["/", "/forget-password"];
    const authPrefixRoutes = ["/otp-page/", "/reset-password/"];

    const isAuthRoute =
        authRoutes.includes(location.pathname) ||
        authPrefixRoutes.some((path) =>
            location.pathname.startsWith(path)
        );

    if (user && isAuthRoute) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}