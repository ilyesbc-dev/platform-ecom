import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/connexion" state={{ from: location.pathname }} replace />
  }

  return children
}

export default PrivateRoute
