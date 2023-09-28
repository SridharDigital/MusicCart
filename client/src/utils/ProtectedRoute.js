import { Navigate, useLocation } from "react-router-dom"
import Cookie from "js-cookie"

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const token = Cookie.get("jwt_token")
  if (token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default ProtectedRoute
