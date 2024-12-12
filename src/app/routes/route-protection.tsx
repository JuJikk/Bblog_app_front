import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user = localStorage.getItem('user_access_token')

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export function PublicRoute({ children }: ProtectedRouteProps) {
    const user = localStorage.getItem('user_access_token')
    if (user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}