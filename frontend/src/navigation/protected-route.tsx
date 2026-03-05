import type React from "react"
import { useUserStore } from "../storage/useAuthStore"
import { Navigate, useLocation } from "react-router";
import { appPath } from "../common/enums";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (	{
		children,
	}) => {
        const { isAuthenticated } = useUserStore();
        const location = useLocation();

        if(!isAuthenticated) {
            toast.error("To create event login first")
            return <Navigate to={appPath.LOGIN} state={{ from: location }} replace/>
        }

        return <>{children}</>
}

export { ProtectedRoute }