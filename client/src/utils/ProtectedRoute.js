import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = ({ children }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn)
  const location = useLocation()
  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default ProtectedRoute
