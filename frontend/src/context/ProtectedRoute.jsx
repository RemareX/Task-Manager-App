import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token || token === "") {
        // If no token, redirect to login page
        return <Navigate to="/" replace />;
    }

    // If token exists, render the children components
    return children;
}