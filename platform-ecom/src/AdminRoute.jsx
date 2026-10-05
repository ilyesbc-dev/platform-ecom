import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

// Comme PrivateRoute, mais en plus il faut être admin.
// Un client connecté qui tape /admin dans l'adresse est renvoyé à l'accueil.
function AdminRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/connexion" replace />
  }
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute