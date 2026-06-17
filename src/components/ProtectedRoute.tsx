import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { ReactNode } from "react";


function ProtectedRoute({ children }: {children: ReactNode}) {
    const { user } = useAuth();
    
    if(!user) {
        return <Navigate to="/login"/>
    }

    return (
        <>
        {children}
        </>
    )
}

export default ProtectedRoute;