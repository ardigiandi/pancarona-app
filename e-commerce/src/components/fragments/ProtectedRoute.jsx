import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router"

export default function ProtectedRoute({ children }) {

    const {user} = useAuth()

    if(!user) {
        return <Navigate to="/auth/signin" replace />
    }

    return children
}